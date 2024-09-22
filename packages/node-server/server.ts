// src/server.ts

import express from "express";
import cors from "cors";
import { initialUsers } from "./src/initialData";
import { User } from "./src/User";

const app = express();
const port = 3001;

app.use(cors());

app.get("/users", (req, res) => {
  res.json(initialUsers);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
