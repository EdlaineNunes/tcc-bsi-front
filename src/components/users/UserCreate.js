// src/components/users/UserCreate.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserCreate = ({ token }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [permissionLevel, setPermissionLevel] = useState('');
  const [cpf, setCpf] = useState('');
  const [active, setActive] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("TokenUserCreate :: ", token);
    const newUser = { email, username, password, permissionLevel, cpf, active };

    try {
      await axios.post('http://localhost:8080/users/register', newUser, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setSuccess(true);
      setTimeout(() => navigate('/users/listAll'), 2000); // Redireciona após 2 segundos
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setError('Erro ao criar usuário.');
    }
  };

  return (
    <div className="user-create-container">
      <h2>Criar Novo Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Digite o e-mail"
          />
        </div>
        <div>
          <label>Nome</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Digite o nome"
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Digite a senha"
          />
        </div>
        <div>
          <label>CPF</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
            placeholder="Digite o CPF"
          />
        </div>
        <div>
          <label>Role</label>
          <select
            value={permissionLevel}
            onChange={(e) => setPermissionLevel(e.target.value)}
            required
          >
            <option value="GUEST">GUEST - Convidado</option>
            <option value="USER">USER - Usuário comum</option>
            <option value="ADMIN">ADMIN - Admin do sistema</option>
            <option value="SUPER_ADMIN">SUPER_ADMIN - SuperAdmin do sistema</option>
          </select>
        </div>
        <div>
          <label>Status</label>
          <select
            value={active}
            onChange={(e) => setActive(e.target.value === 'true')}
            required
          >
            <option value="true">Ativo</option>
            <option value="false">Inativo</option>
          </select>
        </div>
        <button type="submit">Criar Usuário</button>
      </form>
      <li><Link to="/menu">Menu</Link></li>
    </div>
  );

}

export default UserCreate;
