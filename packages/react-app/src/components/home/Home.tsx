import React, { useEffect, useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import styles from "../style/Home.module.css";
import { Link } from "react-router-dom";
import { User } from "../types/User";
import Modal from "./Modal";
import SearchInput from "./SearchInput";
import UserList from "./UserList";

const Home: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
  // Delete user
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/users/${id}`);
        fetchData(); // Refresh data after deletion to avoid conflict
        setModalMessage("User successfully deleted!");
        setModalVisible(true);
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };
  //closing modal succesfully deleted
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
      <SearchInput value={searchTerm} onChange={handleSearch} />
      <div className={styles.innerDiv}>
        <div className={styles.add}>
          <Link to="/create" className={styles.addBtn}>
            Add +
          </Link>
        </div>
        <UserList users={filteredData} onDelete={handleDelete} />
        <Modal
          isVisible={isModalVisible}
          message={modalMessage}
          onClose={closeModal}
        />
      </div>
    </div>
  );
};

export default Home;
