import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { HOST, DATABASE, USERNAME, PASSWORD, PORT } from "./constants";
import { routes } from "./routes";
const app = express();
app.use(bodyParser.json());
app.use(cors());

async function run() {
  //check if db credentials are available
  if (!HOST || !DATABASE || !USERNAME || !PASSWORD)
    throw new Error("Error occured with Database Credentials");

  //create connection
  const connection: Connection = await createConnection({
    type: "mysql",
    host: HOST,
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    synchronize: true,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
  });
  if (!connection.isConnected)
    throw new Error("Connection to Database failed.");

  // adding subroutes
  app.use("/", routes);

  //basic root page
  app.get("/", (req, res) => {
    res.send("hello world");
  });

  // connect to the server
  app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}\n`);
  });
}

run().catch((error) => {
  console.error(error);
});
