import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Register.module.css';
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaRegUserCircle } from 'react-icons/fa';
import CPFInput from "../common/CPFInput";


const RegisterUser = ({ token }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [cpf, setCpf] = useState('');
  const [active, setActive] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const history = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/register', {
        email,
        password,
        role,
        username,
        cpf,
        active
      });
      setSuccess(true);
      alert("Usuário registrado com sucesso! Você será redirecionado ao login.", password)
      setTimeout(() => history('/'), 2000);
    } catch (error) {
      console.error('Erro ao registrar:', error);
      setError('Erro ao realizar o cadastro.');
    }
  };

  return (
    <div className={styles['register-container']}>
      <h2> <FaRegUserCircle style={{ marginRight: '8px' }} />Cadastro</h2>

      {error && <div className={`${styles.message} ${styles.error}`}>{error}</div>}
      {success && <div className={`${styles.message} ${styles.success}`}>Cadastro realizado com sucesso!</div>}

      <form onSubmit={handleRegister}>
        <div className={styles.inputGroup}>
          <FaEnvelope className={styles.icon} />
          <div className={styles.inputWithIcon}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <FaUser className={styles.icon} />
          <div className={styles.inputWithIcon}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nome de usuário"
              required
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <FaLock className={styles.icon} />
          <div className={styles.inputWithIcon}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <FaIdCard className={styles.icon} />
          <div className={styles.inputWithIcon}>
            <CPFInput initialValue={cpf} onChange={(value) => setCpf(value)} />
          </div>
        </div>
        <button type="submit">Cadastrar</button>
      </form>

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
