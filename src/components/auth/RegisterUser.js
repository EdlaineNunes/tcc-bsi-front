import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Register.module.css';

const RegisterUser = ({ token }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const history = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  console.log("Token :: ", token);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/register', {
        email,
        password,
        role,
      });
      setSuccess(true);
      setTimeout(() => history('/login'), 2000);
    } catch (error) {
      console.error('Erro ao registrar:', error);
      setError('Erro ao realizar o cadastro.');
    }
  };

  return (
    <div className={styles['register-container']}>
      <h2>Cadastro</h2>

      {error && <div className={`${styles.message} ${styles.error}`}>{error}</div>}
      {success && <div className={`${styles.message} ${styles.success}`}>Cadastro realizado com sucesso!</div>}

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
          <option value="GUEST">Usuário</option>
        </select>
        <button type="submit">Cadastrar</button>
      </form>

      {/* Botão para voltar ao login */}
      <button
        type="button"
        className={styles['back-button']}
        onClick={() => history('/')}
      >
        Voltar para o Login
      </button>
    </div>
  );
};

export default RegisterUser;
