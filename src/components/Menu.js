import React from 'react';
import { Link } from 'react-router-dom';
// import LogoutButton from '../auth/LogoutButton';

const Menu = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/usuarios">Usuários</Link></li>
        <li><Link to="/users/listAll">Usuários - Listar todos</Link></li>
        <li><Link to="/users/edit/:id">Usuários - Editar </Link></li>
        <li><Link to="/users/create">Usuários - Registrar </Link></li>
        <li><Link to="/documents">Documentos</Link></li>
        <li><Link to="/documents/listAll">Documentos - Listar todos</Link></li>
        {/* <li><LogoutButton /></li> */}
      </ul>
    </nav>
  );
};

export default Menu;
