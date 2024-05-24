import { exec } from "child_process";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" }); // Load environment variables

const execPromise = (command: string) =>
  new Promise<void>((resolve, reject) => {
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
  await execPromise("docker-compose exec test_db pg_isready -U testuser");
};

const applyMigrations = async () => {
  console.log("Applying migrations...");
  await execPromise("npx prisma migrate deploy");
};

const runTests = async () => {
  console.log("Running tests...");
  await execPromise("npx jest --runInBand");
};

const stopDocker = async () => {
  console.log("Stopping Docker container...");
  await execPromise("docker-compose down");
};

const main = async () => {
  try {
    await startDocker();
    await applyMigrations();
    await runTests();
  } catch (error) {
    console.error("Error during setup, migration, or tests:", error);
  } finally {
    await stopDocker();
  }
};

main();
