import React from "react";
import { User } from "./types/User";
import { Link } from "react-router-dom";
import classes from "./style/UserForm.module.css";

interface UserFormProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  title: string;
  buttonText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const UserForm: React.FC<UserFormProps> = ({
  user,
  setUser,
  title,
  buttonText,
  onSubmit,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (index: number, value: string) => {
    const updatedPhones = [...user.phoneNumbers];

    // Ensure there are at least two phone number entries
    while (updatedPhones.length <= index) {
      updatedPhones.push({
        type: index === 0 ? "primary" : "secondary",
        value: "",
      });
    }

    // Update the phone number value
    updatedPhones[index].value = value;

    // Remove the secondary phone if it is cleared
    if (index === 1 && value === "") {
      updatedPhones.splice(1, 1);
    }

    setUser({ ...user, phoneNumbers: updatedPhones });
  };

  return (
    <div className={classes.container}>
      <h1>{title}</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>First name:</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            required
            placeholder="required"
          />
        </div>
        <div>
          <label>Last name:</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            required
            placeholder="required"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            placeholder="required"
          />
        </div>
        <div>
          <label>Primary Phone Number:</label>
          <input
            type="text"
            value={user.phoneNumbers[0]?.value || ""}
            onChange={(e) => handlePhoneChange(0, e.target.value)}
            required
            placeholder="required"
          />
        </div>
        <div>
          <label>Secondary Phone Number:</label>
          <input
            type="text"
            value={user.phoneNumbers[1]?.value || ""}
            onChange={(e) => handlePhoneChange(1, e.target.value)}
            placeholder="optional"
          />
        </div>
        <button type="submit" className={classes.submitBtn}>
          {buttonText}
        </button>
        <Link to="/" className={classes.backBtn}>
          Back
        </Link>
      </form>
    </div>
  );
};

export default UserForm;
