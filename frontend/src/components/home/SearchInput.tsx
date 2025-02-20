import React from "react";
import styles from "../style/Home.module.css";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search..."
    value={value}
    onChange={onChange}
    className={styles.searchInput}
  />
);

export default SearchInput;
