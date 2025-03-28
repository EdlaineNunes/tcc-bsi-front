// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import { FaEnvelope, FaLock, FaSignInAlt, FaUsers } from 'react-icons/fa';

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

      setToken(token);
      alert('Login realizado com sucesso!');
      navigate('/menu');
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Login falhou. Verifique suas credenciais.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2>
          <FaUsers style={{ marginRight: '8px' }} /> Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <FaEnvelope className={styles.icon} />
              Email:
            </label>
            <div className={styles.inputWithIcon}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <FaLock className={styles.icon} />
              Senha:
            </label>
            <div className={styles.inputWithIcon}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.button}>
            <FaSignInAlt style={{ marginRight: '8px' }} /> Entrar
          </button>
        </form>
        <button
          onClick={handleRegisterRedirect}
          className={`${styles.button} ${styles.registerButton}`}
        >
          Não tem uma conta? Registre-se
        </button>
      </div>
    </div>
  );
};

export default Login;