const { exec } = require("child_process");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.test" }); // Load environment variables

const execPromise = (command) =>
  new Promise((resolve, reject) => {
    const process = exec(command, { cwd: path.resolve(__dirname) });

    process.stdout?.on("data", (data) => {
      console.log(data.toString());
    });

    process.stderr?.on("data", (data) => {
      console.error(data.toString());
    });

    process.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });

const startDocker = async () => {
  console.log("Starting Docker container...");
  await execPromise("docker-compose up -d test_db");
  console.log("Waiting for PostgreSQL to be ready...");

  // Wait for a few seconds to give PostgreSQL time to start
  await new Promise((resolve) => setTimeout(resolve, 15000)); // Increase to 15 seconds

  try {
    await execPromise(
      "docker-compose exec -T test_db pg_isready -U testuser -h localhost -p 5432",
    );
    console.log("PostgreSQL is ready!");
  } catch (error) {
    console.error("Error checking PostgreSQL readiness:", error);
    console.log("PostgreSQL logs:");
    await execPromise("docker-compose logs test_db");
    throw error;
  }
};

const applyMigrations = async () => {
  console.log("Applying migrations...");
  try {
    await execPromise("npx prisma migrate deploy");
    console.log("Migrations applied successfully.");
  } catch (error) {
    console.error("Error applying migrations:", error);
    throw error;
  }
};

const seedDatabase = async () => {
  console.log("Seeding database...");
  try {
    await execPromise("npx prisma db seed");
    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};

const runTests = async () => {
  console.log("Running tests...");
  try {
    await execPromise("npx jest --colors");
    console.log("Tests completed successfully.");
  } catch (error) {
    console.error("Tests failed:");
    console.error(error);
    // process.exit(1);
  }
};

const stopDocker = async () => {
  console.log("Stopping Docker container...");
  await execPromise("docker-compose down");
};

const main = async () => {
  try {
    await startDocker();
    await applyMigrations();
    await seedDatabase();
    await runTests();
  } catch (error) {
    console.error("Error during setup, migration, or tests:", error);
  } finally {
    await stopDocker();
  }
};

main();
