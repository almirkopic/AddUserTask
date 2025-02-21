"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserData = exports.validateName = exports.validatePhoneNumber = exports.validateEmail = void 0;
const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};
exports.validateEmail = validateEmail;
const validatePhoneNumber = (phoneNumber) => {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");
    const regex = /^[0-9]{8,17}$/;
    return regex.test(cleanedPhoneNumber);
};
exports.validatePhoneNumber = validatePhoneNumber;
const validateName = (name) => {
    const regex = /^[a-zA-Z]{2,50}$/;
    return regex.test(name);
};
exports.validateName = validateName;
// Main validation function for user data
const validateUserData = (user) => {
    const errors = [];
    // Validate first name and last name
    if (!(0, exports.validateName)(user.firstName)) {
        errors.push("First name must be alphabetic and between 2 and 50 characters long.");
    }
    if (!(0, exports.validateName)(user.lastName)) {
        errors.push("Last name must be alphabetic and between 2 and 50 characters long.");
    }
    // Validate email
    if (!(0, exports.validateEmail)(user.email)) {
        errors.push("Email is invalid.");
    }
    // Validate phone numbers
    user.phoneNumbers.forEach((phone, index) => {
        if (!(0, exports.validatePhoneNumber)(phone.value)) {
            errors.push(`Phone number ${index + 1} is invalid. It should be between 10 and 15 digits long.`);
        }
    });
    return errors;
};
exports.validateUserData = validateUserData;
