// src/utils/mergeUser.ts
import { User } from "../models/User";
import fs from "fs";
import path from "path";
import { Data } from "../types/Data";

export const mergeUsers = (): User[] => {
  const data: Data = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../../dataDB.json"), "utf-8")
  );

  const initialData = data.initialData;
  const namesArray = data.namesArray;

  return initialData.map((user, index) => ({
    _id: `user-${index + 1}`,
    firstName: namesArray[index].firstName,
    lastName: namesArray[index].lastName,
    email: user.email,
    phoneNumbers: user.phoneNumbers,
  }));
};
