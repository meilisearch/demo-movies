import dotenv from 'dotenv';

dotenv.config(); // load environment variables from a .env file into process.env

export const checkEnv = (variables: string | string[]) => {
  if (Array.isArray(variables)) {
    variables.forEach(variable => {
      if (process.env[variable] === undefined) {
        throw new Error(`Please set the ${variable} environment variable.`);
      }
    })
    return
  }
  if (process.env[variables] === undefined) {
    throw new Error(`Please set the ${variables} environment variable.`);
  }
}
