import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from '../styles/Header.module.css';

const Header = () => {
    const { userInfo } = useContext(AuthContext);

    return (
        <header className={styles.header}>
            <div className={styles.userInfo}>
                <span>{userInfo.name}</span> - <span>{userInfo.role}</span>
            </div>
        </header>
    );
};

export default Header;
