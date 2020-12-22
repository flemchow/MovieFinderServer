import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getConnection } from "typeorm";
import { ATOKEN, RTOKEN } from "../constants";
import { User } from "../entity";

// genereate access and refresh tokens
export function generateTokens(user: { username: string; password: string }) {
  let { username } = user;
  const atoken = jwt.sign({ user: user }, ATOKEN!, { expiresIn: "30m" });
  const rtoken = jwt.sign({ user: user }, RTOKEN!, { expiresIn: "1d" });
  getConnection()
    .createQueryBuilder()
    .update(User)
    .set({ rToken: rtoken })
    .where("username=:username", { username: username })
    .execute();
  return { access: atoken, refresh: rtoken };
}

// middleware, validate access token
export function validateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, ATOKEN!, (err, user) => {
      if (err) return res.sendStatus(403);
      req.body = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

// create new access token
export function generateNewAccess(clientRefreshToken: string) {
  try {
    const validity = jwt.verify(clientRefreshToken, RTOKEN!);
    if (validity) {
      const accessToken = jwt.sign({ user: validity }, ATOKEN!, {
        expiresIn: "30m",
      });
      return accessToken;
    }
  } catch (err) {
    console.error(err);
    return 403;
  }
}
