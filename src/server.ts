import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { HOST, DATABASE, USERNAME, PASSWORD, PORT } from "./constants";
import { register, login } from "./routes";
const app = express();
app.use(bodyParser.json());
app.use(cors());

async function run() {
  if (!HOST || !DATABASE || !USERNAME || !PASSWORD)
    throw new Error("Error occured with Database Credentials");

  app.get("/", (req, res) => {
    res.send("hello world");
  });

  app.use("/register", register);
  app.use("/login", login);

  app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}\n`);
  });
}

run().catch((error) => {
  console.error(error);
});
