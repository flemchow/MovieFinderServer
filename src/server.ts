import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const PORT = process.env.PORT || 1234;
const app = express();
app.use(bodyParser.json());
app.use(cors());

async function run() {
  app.get("/", (req, res) => {
    res.send("hello world");
  });

  app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}\n`);
  });
}

run().catch((error) => {
  console.error(error);
});
