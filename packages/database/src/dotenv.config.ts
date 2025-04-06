import { configDotenv } from "dotenv";

configDotenv({
  path: "../../.env"
});

console.log("Environment variables loaded from .env file");
console.log("DATABASE_URL:", process.env.DATABASE_URL);
