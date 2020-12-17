import express from "express";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import { query } from "../connections/dbConnection";
export const login = express.Router();

login.use(bodyParser.urlencoded({ extended: false }));

login.post("/", async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };
  const sqlString = "SELECT * FROM users WHERE email = ?";
  const results = await query(sqlString, { username: user.username });
  console.log(results);

  // try {
  //   await bcrypt.compare(user.password, results[0].password);
  // } catch {
  //   res.sendStatus(500);
  // }
});
