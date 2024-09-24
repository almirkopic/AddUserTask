import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserForm from "./UserForm";
import { User } from "./types/User";

const Create: React.FC = () => {
  const [user, setUser] = useState<User>({
    _id: "", // ID generated on server
    firstName: "",
    lastName: "",
    email: "",
    phoneNumbers: [
      { type: "primary", value: "" },
      { type: "secondary", value: "" },
    ],
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/users", user);
      navigate("/");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <UserForm
      user={user}
      setUser={setUser}
      title="Add a User"
      buttonText="Submit"
      onSubmit={handleSubmit}
    />
  );
};

export default Create;
