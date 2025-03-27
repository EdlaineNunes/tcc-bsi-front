// Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import styles from '../styles/Header.module.css';

const Header = ({ userName, role, handleLogout }) => {
    const navigate = useNavigate()

    const handleLogoutClick = () => {
        handleLogout()
        navigate('/')
    }

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
                <button onClick={handleLogoutClick} className={styles.logoutButton}>
                    <FaSignOutAlt className={styles.logoutIcon} /> {/* Ícone de logout */}
                </button>
            </div>
        </div>
    );
};

export default Header;
