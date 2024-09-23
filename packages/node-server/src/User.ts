// src/User.ts
export interface PhoneNumber {
  type: string;
  value: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumbers: PhoneNumber[];
}
