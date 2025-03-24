// src/components/auth/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const history = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/register', {
        email,
        password,
        role,
      });
      setSuccess(true);
      setTimeout(() => history('/login'), 2000); // Redireciona após 2 segundos
    } catch (error) {
      console.error('Erro ao registrar:', error);
      setError('Erro ao realizar o cadastro.');
    }
  };

  return (
    <div className="register-container">
      <h2>Cadastro</h2>

      {error && <div className="message error">{error}</div>}
      {success && <div className="message success">Cadastro realizado com sucesso!</div>}

      <form onSubmit={handleRegister}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
        />
        <select onChange={(e) => setRole(e.target.value)} required>
          <option value="">Selecione a função</option>
          <option value="USER">Usuário</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;
