// src/routes/router.ts
import { Router } from "express";
import { User } from "../models/User";
import { initialData, namesArray } from "../data/initialData";
import { v4 as uuidv4 } from "uuid";

const router = Router();

// Merge initialData i namesArray
const users: User[] = initialData.map((item, index) => ({
  _id: uuidv4(), // generate ID
  firstName: namesArray[index].firstName,
  lastName: namesArray[index].lastName,
  email: item.email,
  phoneNumbers: item.phoneNumbers,
}));

// GET /users -
router.get("/", (req, res) => {
  const { query, email, phoneNumber } = req.query;

  let filteredUsers = users;

  // Filter
  if (query) {
    const searchTerm = query as string;
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (email) {
    const emailTerm = email as string;
    filteredUsers = filteredUsers.filter((user) =>
      user.email.toLowerCase().includes(emailTerm.toLowerCase())
    );
  }

  if (phoneNumber) {
    const phoneTerm = phoneNumber as string;
    filteredUsers = filteredUsers.filter((user) =>
      user.phoneNumbers.some((phone) => phone.value.includes(phoneTerm))
    );
  }

  res.json(filteredUsers);
});

// GET /users/:id
router.get("/:id", (req, res) => {
  const user = users.find((user) => user._id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// POST /users -
router.post("/", (req, res) => {
  const { firstName, lastName, email, phoneNumbers }: User = req.body;

  const newUser: User = {
    _id: uuidv4(),
    firstName,
    lastName,
    email,
    phoneNumbers: [
      phoneNumbers[0], // primary
      phoneNumbers[1] || { type: "secondary", value: "" }, // secondary optional
    ],
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/:id -
router.put("/:id", (req, res) => {
  const userIndex = users.findIndex((user) => user._id === req.params.id);
  if (userIndex !== -1) {
    const updatedUser: User = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// DELETE /users/:id -
router.delete("/:id", (req, res) => {
  const userIndex = users.findIndex((user) => user._id === req.params.id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, message: "User not found" });
  }
});

export default router;
