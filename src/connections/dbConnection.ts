import mysql from "mysql";
import { error } from "./";
import { HOST, DATABASE, USERNAME, PASSWORD } from "../constants";

const dbConfig = {
  host: HOST,
  database: DATABASE,
  user: USERNAME,
  password: PASSWORD,
};

interface IUser {
  username: string;
  password: string;
  rToken: string | null;
  userID: number;
}

export async function query(sqlString: string, values: {}) {
  const pool = mysql.createPool(dbConfig);

  const results = await new Promise((resolve, reject) => {
    pool.query(sqlString, values, (err, result, fields) => {
      if (err) {
        console.error(err);
        reject(500);
      }

      if (fields) resolve(result);
      resolve(200);
    });
  });

  return results;
}
