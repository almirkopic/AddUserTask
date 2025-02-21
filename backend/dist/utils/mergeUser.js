"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeUsers = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mergeUsers = () => {
    const data = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../../dataDB.json"), "utf-8"));
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
exports.mergeUsers = mergeUsers;
