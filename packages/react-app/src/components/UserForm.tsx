import React from "react";
import { User } from "./types/types";
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
    updatedPhones[index].value = value;
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
          />
        </div>
        <div>
          <label>Phone Numbers:</label>
          {user.phoneNumbers.map((phone, index) => (
            <div key={index}>
              <input
                type="text"
                value={phone.value}
                onChange={(e) => handlePhoneChange(index, e.target.value)}
                required
              />
            </div>
          ))}
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
