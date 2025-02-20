import React from "react";
import { User } from "../types/User";
import UserRow from "./UserRow";

interface UserListProps {
  users: User[];
  onDelete: (id: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onDelete }) => (
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {users.length > 0 ? (
        users.map((user, index) => (
          <UserRow
            key={user._id}
            user={user}
            index={index}
            onDelete={onDelete}
          />
        ))
      ) : (
        <tr>
          <td colSpan={6}>No users found</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default UserList;
