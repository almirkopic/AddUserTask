import express from "express";
import cors from "cors";
import userRoutes from "./routes/router";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the User API");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
