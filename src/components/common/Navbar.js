// src/components/common/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Cadastro</Link></li>
        <li><Link to="/users">Usuários</Link></li>
        <li><Link to="/documents">Documentos</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
