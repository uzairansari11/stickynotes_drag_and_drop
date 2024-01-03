import React from 'react'
import styles from "./Navbar.module.css"
import { CiSquarePlus } from "react-icons/ci";
const Navbar = ({handleModal}) => {
  return (
    <div  className={styles.navbarContainer} onClick={handleModal}>
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