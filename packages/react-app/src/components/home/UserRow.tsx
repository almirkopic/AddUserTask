import React from "react";
import { User } from "../types/User";
import { Link } from "react-router-dom";
import styles from "../style/Home.module.css";

interface UserRowProps {
  user: User;
  index: number;
  onDelete: (id: string) => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, index, onDelete }) => (
  <tr>
    <td>{index + 1}</td>
    <td>{user.firstName}</td>
    <td>{user.lastName}</td>
    <td>{user.email}</td>
    <td>
      {user.phoneNumbers.map((phone, idx) =>
        phone.value ? (
          <div key={`${user._id}-${idx}`}>
            {phone.value}
            <span className={styles.phoneType}>({phone.type})</span>
          </div>
        ) : null
      )}
    </td>
    <td className={styles.btnContainer}>
      <Link to={`/read/${user._id}`} className={styles.read}>
        Read
      </Link>
      <Link to={`/update/${user._id}`} className={styles.edit}>
        Edit
      </Link>
      <button className={styles.delete} onClick={() => onDelete(user._id)}>
        Delete
      </button>
    </td>
  </tr>
);

export default UserRow;
