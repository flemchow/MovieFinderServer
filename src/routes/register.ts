import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import bycrpt from "bcrypt";
import { User } from "../entity";
import { getConnection } from "typeorm";
export const register = express.Router();
register.use(bodyParser.urlencoded({ extended: false }));

// create new account
register.post("/", async (req: Request, res: Response) => {
  let { username, password, email } = req.body;
  try {
    const hashedPassword = await bycrpt.hash(password, 10);
    let newUser = {
      email: email,
      username: username,
      password: hashedPassword,
    };
    const existUsername = await User.find({ username: username });
    const existEmail = await User.find({ email: email });
    if (!existEmail.length || !existUsername.length) {
      const response = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(newUser)
        .execute();
      response.raw.serverStatus === 2
        ? res.sendStatus(200)
        : res.sendStatus(500);
    } else {
      res.sendStatus(409);
    }
  } catch {
    res.sendStatus(500);
  }
});

// delete account
register.delete("/", async (req: Request, res: Response) => {
  let userId = req.body.userId;
  try {
    const exists = await User.find({ userId: userId });
    if (exists) {
      const response = await getConnection()
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("userId = :userId", { userId: userId })
        .execute();
      response.raw.serverStatus === 2
        ? res.sendStatus(200)
        : res.sendStatus(500);
    }
  } catch {
    res.sendStatus(500);
  }
});
