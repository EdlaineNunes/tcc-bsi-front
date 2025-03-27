import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/Menu.module.css';

const Menu = ({ token, userInfo }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {userInfo ? (
          <span>Usuário: {userInfo.name} | Permissão: {userInfo.role}</span>
        ) : (
          <span>Carregando informações...</span>
        )}
      </header>

      <nav className={styles.navbar}>
        <h1>MENU</h1>
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
            <Link to="/documents/listAll/user" className={styles.menuButton}>Documentos - Meus Documentos</Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/register" className={styles.menuButton}>Registro</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
