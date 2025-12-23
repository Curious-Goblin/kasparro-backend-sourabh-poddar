import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
};

if (!config.databaseUrl) {
  throw new Error("DATABASE_URL is missing");
}

if (!config.apiKey) {
  throw new Error("API_KEY is missing");
}
