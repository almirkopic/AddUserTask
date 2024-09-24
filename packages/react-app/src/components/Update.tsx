import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserForm from "./UserForm";
import { User } from "./types/User";

const Update: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumbers: [
      { type: "primary", value: "" },
      { type: "secondary", value: "" }, // Initialize secondary phone
    ],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get<User>(`http://localhost:3001/users/${id}`);

        // Ensure phoneNumbers is always initialized
        const userData = {
          ...res.data,
          phoneNumbers: res.data.phoneNumbers.length
            ? res.data.phoneNumbers
            : [
                { type: "primary", value: "" },
                { type: "secondary", value: "" },
              ],
        };

        setUser(userData);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Filter out any empty phone numbers before submitting
    const filteredUser = {
      ...user,
      phoneNumbers: user.phoneNumbers.filter((phone) => phone.value !== ""),
    };

    try {
      await axios.put(`http://localhost:3001/users/${id}`, filteredUser);
      navigate("/");
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <UserForm
      user={user}
      setUser={setUser}
      title="Update User"
      buttonText="Update"
      onSubmit={handleSubmit}
    />
  );
};

export default Update;
