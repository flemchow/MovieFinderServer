import dotenv from "dotenv";
dotenv.config();
export const USERNAME = process.env.USERNAME;
export const PASSWORD = process.env.PASSWORD;
export const HOST = process.env.HOST;
export const DATABASE = process.env.DATABASE;
export const PORT = process.env.PORT || 1234;
