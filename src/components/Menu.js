import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEdit, FaUserPlus, FaFileAlt, FaFile, FaClipboardList, FaIdCard } from 'react-icons/fa';
import styles from './styles/Menu.module.css';
import Header from './common/Header'; // Importando Header
import { FcDataConfiguration } from 'react-icons/fc';

const Menu = ({ token, userName, role, handleLogout }) => {
  return (
    <div>
      <Header userName={userName} role={role} handleLogout={handleLogout} />
      <nav className={styles.navbar}>
        <h1><FcDataConfiguration style={{ marginRight: '10px' }} />MENU</h1>
        <p style={{ color: '#ffffff' }}>Escolha a operação a ser realizada</p>
        <ul className={styles.menuList}>
          {/* Exibe "Meu Perfil" para todos os usuários */}
          <li className={styles.menuItem}>
            <Link to="/profile" className={styles.menuButton}>
              <FaIdCard style={{ marginRight: '10px' }} /> Meu Perfil
            </Link>
          </li>

          {/* Exibe a mensagem caso o usuário seja GUEST */}
          {role === 'GUEST' ? (
            <li className={styles.menuItem}>
              <p style={{ color: '#ffffff' }}>Entre em contato com um administrador do sistema para solicitar permissões</p>
            </li>
          ) : (
            <>
              {/* Admin e Super Admin têm acesso à lista de usuários */}
              {(role === 'ADMIN' || role === 'SUPER_ADMIN') && (
                <li className={styles.menuItem}>
                  <Link to="/users/listAll" className={styles.menuButton}>
                    <FaClipboardList style={{ marginRight: '10px' }} /> Listar Todos os Usuários
                  </Link>
                </li>
              )}

              {/* Admin e Super Admin têm permissão para registrar novos usuários */}
              {(role === 'ADMIN' || role === 'SUPER_ADMIN') && (
                <li className={styles.menuItem}>
                  <Link to="/users/create" className={styles.menuButton}>
                    <FaUserPlus style={{ marginRight: '10px' }} /> Realizar Registro de Usuários
                  </Link>
                </li>
              )}

              {/* Admin e Super Admin têm acesso a edição de usuários
              {(role === 'ADMIN' || role === 'SUPER_ADMIN') && (
                <li className={styles.menuItem}>
                  <Link to="/users/edit/:id" className={styles.menuButton}>
                    <FaEdit style={{ marginRight: '10px' }} /> Usuários - Editar
                  </Link>
                </li>
              )} */}

              {/* Todos os usuários (exceto GUEST) têm acesso à parte de Documentos */}
              {role !== 'GUEST' && (
                <>
                  <li className={styles.menuItem}>
                    <Link to="/documents/listAll" className={styles.menuButton}>
                      <FaFileAlt style={{ marginRight: '10px' }} /> Listar Todos os Documentos
                    </Link>
                  </li>
                  <li className={styles.menuItem}>
                    <Link to="/documents/listAll/user" className={styles.menuButton}>
                      <FaFile style={{ marginRight: '10px' }} /> Meus Documentos
                    </Link>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
