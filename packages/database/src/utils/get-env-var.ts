import "#dotenv.config";

export const getEnvVariable = (name: string) => {
  const value = process.env[name];

  if (value == null) {
    throw new Error(`environment variable ${name} not found`);
  }

  console.log(`Using ${name} from environment: ${value}`);
  return value;
};
