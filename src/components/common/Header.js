// Header.js
import React from 'react';
import { FaUser } from 'react-icons/fa';
import styles from '../styles/Header.module.css';

const Header = ({ userName, role }) => {
    return (
        <div className={styles.header}>
            <div className={styles.userInfo}>
                <FaUser className={styles.userIcon} />
                <div className={styles.userDetails}>
                    <span className={styles.userName}>{userName}</span>
                    <span className={styles.userRole}>({role})</span> {/* Exibindo o role */}
                </div>
            </div>
        </div>
    );
};

export default Header;
