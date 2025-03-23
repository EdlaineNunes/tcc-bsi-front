// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8080/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      );

      const token = response.data.token || response.data;
      console.log("Token recebido:", token);
      
      if (!token) {
        throw new Error("Token não encontrado na resposta");
      }

      setToken(token);  // Passando o token para o estado global

      alert('Login realizado com sucesso!');
      navigate('/menu');
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Login falhou. Verifique suas credenciais.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />

          <label className={styles.label}>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />

          <button type="submit" className={styles.button}>Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
