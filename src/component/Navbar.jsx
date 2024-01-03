import React from 'react'
import styles from "./Navbar.module.css"
import { CiSquarePlus } from "react-icons/ci";
const Navbar = ({handleModal}) => {
  return (
    <div  style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
   
    }} onClick={handleModal}>
        <div>
       <img   src='/logo.png'  alt='logo'/>
        </div>
        <div className={styles.buttonDiv} >
            <p className={styles.textStyle}>Add Notes</p>
            <CiSquarePlus size={'2rem'}  color='red'  />
        </div>
    </div>
  )
}

export default Navbar

