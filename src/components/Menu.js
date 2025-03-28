// Menu.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEdit, FaUserPlus, FaFileAlt, FaFile, FaClipboardList } from 'react-icons/fa';
import styles from './styles/Menu.module.css';
import Header from './common/Header'; // Importando Header
import { FcDataConfiguration } from 'react-icons/fc';

const Menu = ({ token, userName, role, handleLogout }) => {
  return (
    <div>
      <Header userName={userName} role={role} handleLogout={handleLogout} />
      <nav className={styles.navbar}>
        <h1><FcDataConfiguration style={{ marginRight: '10px' }} />MENU</h1>
        <p>Escolha a operação a ser realizada</p>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link to="/users/listAll" className={styles.menuButton}>
              <FaClipboardList style={{ marginRight: '10px' }} /> Usuários - Listar todos
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/users/edit/:id" className={styles.menuButton}>
              <FaEdit style={{ marginRight: '10px' }} /> Usuários - Editar
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/users/create" className={styles.menuButton}>
              <FaUserPlus style={{ marginRight: '10px' }} /> Usuários - Registrar
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/documents/listAll" className={styles.menuButton}>
              <FaFileAlt style={{ marginRight: '10px' }} /> Documentos - Listar todos
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/documents/listAll/user" className={styles.menuButton}>
              <FaFile style={{ marginRight: '10px' }} /> Documentos - Meus Documentos
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/register" className={styles.menuButton}>
              <FaUser style={{ marginRight: '10px' }} /> Registro
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
