import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/UserCreate.module.css';
import Header from "../common/Header";
import { FaBars, FaUserPlus } from 'react-icons/fa';
import CPFInput from "../common/CPFInput";  // Importe o CPFInput

const UserCreate = ({ token, userName, role, handleLogout }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [permissionLevel, setPermissionLevel] = useState('');
  const [cpf, setCpf] = useState('');
  const [active, setActive] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se as senhas são iguais
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      setSuccess(false);
      return;
    }

    // Remove os caracteres de formatação do CPF (pontos e hífens)
    const cpfWithoutFormat = cpf.replace(/[^\d]+/g, '');

    const newUser = { email, username, password, permissionLevel, cpf: cpfWithoutFormat, active };

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
      alert('Erro ao criar usuário');
    }
  };

  return (
    <div>
      <Header userName={userName} role={role} handleLogout={handleLogout} />
      <div className={styles.createContainer}>
        <div className={styles.createCard}>
          <h2><FaUserPlus style={{ marginRight: '10px' }} />Criar Novo Usuário</h2>

          {error && <div className={`${styles.message} ${styles.error}`}>{error}</div>}
          {success && <div className={`${styles.message} ${styles.success}`}>Usuário criado com sucesso!</div>}

          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Digite o e-mail"
            />

            <label>Nome</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Digite o nome"
            />

            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Digite a senha"
            />

            <label>Confirmar Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirme a senha"
            />

            <label>CPF</label>
            <CPFInput initialValue={cpf} onChange={setCpf} /> {/* Usando o componente CPFInput aqui */}

            <label>Permissão</label>
            <select
              value={permissionLevel}
              onChange={(e) => setPermissionLevel(e.target.value)}
              required
            >
              <option value="">Selecione...</option>
              <option value="GUEST">GUEST - Convidado</option>
              <option value="USER">USER - Usuário comum</option>
              <option value="COUNTER">COUNTER - Contador</option>
              <option value="ADMIN">ADMIN - Admin do sistema</option>
              <option value="SUPER_ADMIN">SUPER_ADMIN - SuperAdmin do sistema</option>
            </select>

            <label>Status</label>
            <select
              value={active}
              onChange={(e) => setActive(e.target.value === 'true')}
              required
            >
              <option value="">Selecione...</option>
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
            </select>

            <div className={styles.containerbtn}>
              <div className="button-group">
                <button type="submit" className="btn btn-upload">
                  <FaUserPlus style={{ marginRight: '10px' }} />
                  Criar Usuário
                </button>
                <Link to="/menu" className="btn btn-menu">
                  <FaBars style={{ marginRight: '10px' }} />
                  MENU
                </Link>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default UserCreate;
