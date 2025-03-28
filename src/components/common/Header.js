// Header.js
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
            <h1><FaFileCircleCheck style={{ marginRight: '10px' }} />Gestão de Documentos - Núcleo do Pequi</h1>
            <div className={styles.headerContent}>
                <div className={styles.userDetails}>
                    <FaUserCircle style={{ marginRight: '10px' }} />
                    <span className={styles.welcome}>Seja bem vindo!</span>
                    <br />
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
