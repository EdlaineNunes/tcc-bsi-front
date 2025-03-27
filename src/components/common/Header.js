// Header.js
import React from 'react';
import { FaUser } from 'react-icons/fa';
import styles from '../styles/Header.module.css';

const Header = ({ userName, role }) => {
    return (
        <div className={styles.header}>
            <h1> DMS </h1>
            <div className={styles.headerContent}>
                <FaUser className={styles.userIcon} />
                <div className={styles.userDetails}>
                    <span className={styles.userName}>{userName}</span>
                    <br />
                    <span className={styles.userRole}>({role})</span> {/* Exibindo o role */}
                </div>
            </div>
        </div>
    );
};

export default Header;
