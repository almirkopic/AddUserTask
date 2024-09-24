// src/types/User.ts
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumbers: { type: string; value: string }[];
}
