import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserCreate = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = { email, name, password, role };

    try {
      await axios.post('http://localhost:8080/users/register', newUser);  // Ajuste o endpoint conforme sua API
      navigate('/users');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  return (
    <div>
      <h2>Criar Novo Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Nome</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Role</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            required
          >
            <option value="USER">Usuário</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button type="submit">Criar Usuário</button>
      </form>
    </div>
  );
};

export default UserCreate;
