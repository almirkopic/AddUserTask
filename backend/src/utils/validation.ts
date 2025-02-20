import { User } from "../models/User";

export const validateEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");
  const regex = /^[0-9]{10,15}$/;
  return regex.test(cleanedPhoneNumber);
};

export const validateName = (name: string): boolean => {
  const regex = /^[a-zA-Z]{2,50}$/;
  return regex.test(name);
};

// Main validation function for user data
export const validateUserData = (user: User): string[] => {
  const errors: string[] = [];

  // Validate first name and last name
  if (!validateName(user.firstName)) {
    errors.push(
      "First name must be alphabetic and between 2 and 50 characters long."
    );
  }

  if (!validateName(user.lastName)) {
    errors.push(
      "Last name must be alphabetic and between 2 and 50 characters long."
    );
  }

  // Validate email
  if (!validateEmail(user.email)) {
    errors.push("Email is invalid.");
  }

  // Validate phone numbers
  user.phoneNumbers.forEach((phone, index) => {
    if (!validatePhoneNumber(phone.value)) {
      errors.push(
        `Phone number ${
          index + 1
        } is invalid. It should be between 10 and 15 digits long.`
      );
    }
  });

  return errors;
};
