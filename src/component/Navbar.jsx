import React from "react";
import styles from "./Navbar.module.css";
import { CiSquarePlus } from "react-icons/ci";
const Navbar = ({ handleModal }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      }}
      onClick={handleModal}
    >
      <div>
        <img src="/logo.png" alt="logo" />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          columnGap: "2rem",
          padding: "0rem 1rem",
          borderRadius: "2rem",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        }}
      >
        <p className={styles.textStyle}>Add Notes</p>
        <CiSquarePlus size={"2rem"} color="red" />
      </div>
    </div>
  );
};

export default Navbar;
