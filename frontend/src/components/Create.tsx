import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserForm from "./UserForm";
import { User } from "./types/User";

const Create: React.FC = () => {
  const [user, setUser] = useState<User>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumbers: [
      { type: "primary", value: "" },
      { type: "secondary", value: "" },
    ],
  });

  const [errors, setErrors] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]); // Reset errors
    try {
      await axios.post("http://localhost:3001/users", user);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(["An unexpected error occurred"]);
      }
    }
  };

  return (
    <UserForm
      user={user}
      setUser={setUser}
      title="Add new user"
      buttonText="Submit"
      onSubmit={handleSubmit}
      errors={errors}
    />
  );
};

export default Create;
