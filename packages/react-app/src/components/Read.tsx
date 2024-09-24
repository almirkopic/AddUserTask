import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { User } from "./types/User";
import styles from "./style/Read.module.css";

const Read: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      console.log("Fetching user with ID:", id);
      try {
        const res = await axios.get<User>(`http://localhost:3001/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h3>Detail of User</h3>
      <div className={styles.details}>
        <div>
          <strong>First Name: </strong> {user.firstName}
        </div>
        <div>
          <strong>Last Name: </strong> {user.lastName}
        </div>
        <div>
          <strong>Email: </strong> {user.email}
        </div>
        <div>
          <strong>Primary Phone: </strong> {user.phoneNumbers[0]?.value}
        </div>

        {user.phoneNumbers[1]?.value && (
          <div>
            <strong>Secondary Phone: </strong> {user.phoneNumbers[1].value}
          </div>
        )}
      </div>
      <Link to={`/update/${user._id}`} className={styles.editLink}>
        Edit
      </Link>
      <Link to="/" className={styles.backLink}>
        Back
      </Link>
    </div>
  );
};

export default Read;
