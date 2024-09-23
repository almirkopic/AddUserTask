import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/users";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
