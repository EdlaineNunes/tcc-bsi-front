import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/Menu.module.css';

const Menu = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <Link to="/users/listAll" className={styles.menuButton}>Usuários - Listar todos</Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/users/edit/:id" className={styles.menuButton}>Usuários - Editar</Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/users/create" className={styles.menuButton}>Usuários - Registrar</Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/documents/listAll" className={styles.menuButton}>Documentos - Listar todos</Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/documents/listAll/user" className={styles.menuButton}>Documentos - Listar do usuário</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
