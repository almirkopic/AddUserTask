import React, { useEffect, useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import styles from "./style/Home.module.css";
import { Link } from "react-router-dom";
import { User } from "./types/User";
import Modal from "./home/Modal";

const Home: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Fetching users from the backend API
  const fetchData = async () => {
    try {
      const res = await axios.get<User[]>("http://localhost:3001/users");
      setData(res.data);
      setFilteredData(res.data);
    } catch (err: unknown) {
      const error = err as AxiosError;
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handling search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredData(
      term
        ? data.filter(
            (user) =>
              user.firstName.toLowerCase().includes(term) ||
              user.lastName.toLowerCase().includes(term) ||
              user.email.toLowerCase().includes(term) ||
              user.phoneNumbers.some((phone) => phone.value.includes(term))
          )
        : data
    );
  };

  // Handling user deletion
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/users/${id}`);
        fetchData(); // Refresh data after deletion
        setModalMessage("User successfully deleted!");
        setModalVisible(true);
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  const closeModal = useCallback(() => setModalVisible(false), []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    if (isModalVisible) {
      window.addEventListener("keydown", handleKeyPress);
    } else {
      window.removeEventListener("keydown", handleKeyPress);
    }

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isModalVisible, closeModal]);

  return (
    <div className={styles.container}>
      <h1>List of Users</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchInput}
      />
      <div className={styles.innerDiv}>
        <div className={styles.add}>
          <Link to="/create" className={styles.addBtn}>
            Add +
          </Link>
        </div>
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
            {filteredData.length > 0 ? (
              filteredData.map((user, index) => (
                <UserRow
                  key={user._id}
                  user={user}
                  index={index}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6}>No users found</td>
              </tr>
            )}
          </tbody>
        </table>

        <Modal
          isVisible={isModalVisible}
          message={modalMessage}
          onClose={closeModal}
        />
      </div>
    </div>
  );
};

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
      {user.phoneNumbers.map((phone, idx) => {
        // Check if the phone number value exists before rendering
        if (phone.value) {
          return (
            <div key={`${user._id}-${idx}`}>
              {phone.value}
              <span className={styles.phoneType}>({phone.type})</span>
            </div>
          );
        }
        return null; // Do not render anything if there is no value
      })}
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

export default Home;
