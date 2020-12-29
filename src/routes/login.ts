import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import { User } from "../entity";
import {
  generateNewAccess,
  generateTokens,
  validateToken,
} from "../authorization";
import { getConnection } from "typeorm";
export const login = express.Router();
login.use(bodyParser.urlencoded({ extended: false }));

//log in
login.post("/", async (req: Request, res: Response) => {
  let { username, password } = req.body;

  try {
    const results = await User.find({ username: username });
    if (results.length) {
      if (await bcrypt.compare(password, results[0].password)) {
        let { access, refresh } = generateTokens({
          username: username,
          password: password,
        });
        res.send({
          username: results[0].username,
          accessToken: access,
          refreshToken: refresh,
        });
      } else {
        res.sendStatus(406);
      }
    } else {
      res.sendStatus(404);
    }
  } catch {
    res.sendStatus(500);
  }
});

// log out
login.delete("/", validateToken, async (req: Request, res: Response) => {
  getConnection()
    .createQueryBuilder()
    .update(User)
    .set({ rToken: "" })
    .where("username=:username", { username: req.body.user.username })
    .execute();
  res.send(200);
});

// endpoint for sending new access token
login.post("/token", async (req, res) => {
  let sentRefreshToken = req.body.rtoken;
  if (!sentRefreshToken) return res.sendStatus(401);

  const result = await User.find({ rToken: sentRefreshToken });
  if (result.length) {
    const accessToken = generateNewAccess(sentRefreshToken);
    accessToken === "invalid"
      ? res.sendStatus(403)
      : res.send({ accessToken: accessToken });
  } else {
    res.sendStatus(404);
  }
});
