import dotenv from 'dotenv';
dotenv.config();


export const DATABASE_URL = process.env.DATABASE_URI;

export const ENVIRONMENT = process.env.ENVIRONMENT;

export const IS_DEV = ENVIRONMENT == "DEVELOPMENT";

/* *NOTE -  - Unused */
export const GLOBAL_SALT = process.env.GLOBAL_SALT;
