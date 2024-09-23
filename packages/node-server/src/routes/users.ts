import { Router } from "express";
import { User } from "../User"; // Putanja do User.ts
import { initialUsers } from "../data/initialData"; // Putanja do initialData.ts

const router = Router();
let users: User[] = initialUsers;

router.get("/", (req, res) => {
  res.json(users);
});

router.post("/", (req, res) => {
  const newUser: User = {
    _id: (users.length + 1).toString(),
    ...req.body,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

router.get("/:id", (req, res) => {
  const user = users.find((u) => u._id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

export default router;
