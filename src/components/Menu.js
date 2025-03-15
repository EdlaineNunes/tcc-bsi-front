import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

const Menu = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/users">Usuários</Link></li>
        <li><Link to="/documents">Documentos</Link></li>
        <li><LogoutButton /></li>
      </ul>
    </nav>
  );
};

export default Menu;
