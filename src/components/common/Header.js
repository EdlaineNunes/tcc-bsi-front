import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import styles from '../styles/Header.module.css';
import { FaFileCircleCheck } from 'react-icons/fa6';

const Header = ({ userName, role, handleLogout }) => {
    const navigate = useNavigate()

    const handleLogoutClick = () => {
        handleLogout()
        navigate('/')
    }

    return (
        <div className={styles.header}>
            <div className={styles.headerTitle}>
                <img src="/pequi.png" alt="Logo" className={styles.logo} />
                <div>
                    <h1>Gestão de Documentos </h1>
                    <h1>Núcleo do Pequi</h1>
                </div>
            </div>
            <div className={styles.headerContent}>
                <div className={styles.userDetails}>
                    <FaUserCircle style={{ marginRight: '10px' }} />
                    <span className={styles.welcome}>Seja bem vindo(a)!</span>
                    <br />
                    <span className={styles.userName}>{userName}</span>
                    <br />
                    <span className={styles.userRole}>({role})</span>
                </div>
                <button onClick={handleLogoutClick} className={styles.logoutButton}>
                    <FaSignOutAlt className={styles.logoutIcon} />
                </button>
            </div>
        </div>
    );
};

export default Header;
