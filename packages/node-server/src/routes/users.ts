import { Router } from "express";
import { User } from "../User";
import { initialUsers } from "../data/initialData";
import { v4 as uuidv4 } from "uuid";

const router = Router();
let users: User[] = initialUsers;

// Helper
const validateUser = (user: User) => {
  const { firstName, lastName, email, phoneNumbers } = user;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumbers ||
    !Array.isArray(phoneNumbers)
  ) {
    return false;
  }
  return true;
};

// GET /
router.get("/", (req, res) => {
  res.json(users);
});

// POST /
router.post("/", (req, res) => {
  const { firstName, lastName, email, phoneNumbers } = req.body;

  // val
  if (!validateUser(req.body)) {
    return res.status(400).json({
      message: "All fields are required and phoneNumbers must be an array.",
    });
  }

  const newUser: User = {
    _id: uuidv4(), // unique UUID
    firstName,
    lastName,
    email,
    phoneNumbers,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// GET /:id
router.get("/:id", (req, res) => {
  const user = users.find((u) => u._id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// PUT /:id
router.put("/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u._id === req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const updatedUser: User = {
    ...users[userIndex],
    ...req.body,
  };

  if (!validateUser(updatedUser)) {
    return res.status(400).json({ message: "Invalid data format." });
  }

  users[userIndex] = updatedUser;
  res.json(updatedUser);
});

// DELETE /:id -
router.delete("/:id", (req, res) => {
  const userId = req.params.id;
  const userExists = users.find((user) => user._id === userId);
  if (!userExists) {
    return res.status(404).json({ message: "User not found" });
  }

  users = users.filter((user) => user._id !== userId);
  res.status(204).send();
});

export default router;
