import express from "express";
import bodyParser from "body-parser";
import bycrpt from "bcrypt";
import { query } from "../connections";
export const register = express.Router();
register.use(bodyParser.urlencoded({ extended: false }));

register.post("/", async (req, res) => {
  try {
    const hashedPassword = await bycrpt.hash(req.body.password, 10);
    let user = {
      username: req.body.username,
      password: hashedPassword,
    };
    const sqlStringCheckExists =
      "SELECT EXISTS(SELECT * FROM users WHERE username = ?)";
    const checkExists = await query(sqlStringCheckExists, [user.username]);

    console.log(typeof checkExists);
    console.log(checkExists);
    if (typeof checkExists === "object" && checkExists) {
      if (checkExists) {
        const sqlString = "INSERT INTO users set ?";
        const response = await query(sqlString, user);

        if (typeof response === "number") res.sendStatus(response);
      } else {
        res.sendStatus(409);
      }
    }
  } catch {
    res.sendStatus(500);
  }
});

register.delete("/", async (req, res) => {
  let username = req.body.username;

  const sqlString = "DELETE FROM users WHERE username = ?";
  const response = await query(sqlString, [username]);

  if (typeof response === "number") res.sendStatus(response);
});
