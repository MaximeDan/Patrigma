// Prisma 7 configuration file
// Connection URL is read from environment variable
// This file is used by Prisma Migrate for database connections

const prismaConfig = {
  datasource: {
    url: process.env.DATABASE_URL,
  },
};

export default prismaConfig;
