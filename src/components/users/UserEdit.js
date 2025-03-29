import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/UserEdit.module.css';
import Header from '../common/Header';
import { FaSave, FaEdit, FaBars, FaKey } from 'react-icons/fa';
import CPFInput from "../common/CPFInput";
import { FaX } from 'react-icons/fa6';

const UserEdit = ({ token, userName, role, handleLogout }) => {
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const { id } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [permissionLevel, setPermissionLevel] = useState('');
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState(null);
  const [active, setActive] = useState(false);
  const [success, setSuccess] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);  // Controla a exibição do formulário de senha

  useEffect(() => {
    setEmail('');
    setUsername('');
    setPermissionLevel('');
    setCpf('');
    setActive(false);

    if (!token) {
      navigate('/');
      return;
    }

    axios.get(`${API_URL}/users/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => {
        const { email, username, permissionLevel, cpf, active } = response.data;
        setEmail(email);
        setUsername(username);
        setPermissionLevel(permissionLevel);
        setCpf(cpf);
        setActive(active);
      })
      .catch((error) => {
        console.error('Erro ao carregar usuário:', error);
        setError('Erro ao carregar usuário.');
        if (error.response) {
          navigate('/error/422');
        } else {
          navigate('/error/500');
        }
      });
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      email,
      username,
      permissionLevel,
      cpf,
    };

    try {
      await axios.put(`${API_URL}/users/${id}`, updatedUser, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      setSuccess(true);
      setTimeout(() => navigate('/users/listAll'), 2000);
    } catch (error) {
      setError('Erro ao editar usuário.');
      console.error('Erro ao editar usuário:', error);
    }
  };

  const handleChangeStatus = async (status) => {
    try {
      const url = `${API_URL}/users/${id}/${status ? 'enable' : 'disable'}`;

      await axios.put(url, {}, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      setActive(status); // Atualiza o estado de 'active' conforme o novo status
      alert(`Usuário ${status ? 'ativado' : 'desativado'} com sucesso!`);
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      setError('Erro ao alterar status do usuário.');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError('As senhas não coincidem.');
      setPasswordSuccess('');
      return;
    }

    try {
      const response = await axios.put(
        `${API_URL}/users/${id}/change-password`,
        { password },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setPasswordSuccess('Senha alterada com sucesso!');
        setPasswordError('');
        setShowPasswordForm(false);  // Fecha o formulário após sucesso
      }
    } catch (error) {
      setPasswordError('Erro ao alterar a senha.');
      setPasswordSuccess('');
    }
  };

  return (
    <div>
      <Header userName={userName} role={role} handleLogout={handleLogout} />
      <div className={styles.editContainer}>
        <div className={styles.editCard}>
          <h2><FaEdit style={{ marginRight: '10px' }} />Editar Usuário</h2>

          {error && <div className={`${styles.message} ${styles.error}`}>{error}</div>}
          {success && <div className={`${styles.message} ${styles.success}`}>Usuário atualizado com sucesso!</div>}

          <form onSubmit={handleSubmit}>
            <label>Nome</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label>CPF</label>
            <CPFInput initialValue={cpf} onChange={(value) => setCpf(value)} />

            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Permissão</label>
            <select
              value={permissionLevel}
              onChange={(e) => setPermissionLevel(e.target.value)}
              required
            >
              <option value="GUEST">GUEST - Convidado</option>
              <option value="USER">USER - Usuário comum</option>
              <option value="COUNTER">COUNTER - Contador</option>
              <option value="ADMIN">ADMIN - Admin do sistema</option>
              <option value="SUPER_ADMIN">SUPER_ADMIN - SuperAdmin do sistema</option>
            </select>

            <label>Status</label>
            <div className={styles.toggleContainer}>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(e) => handleChangeStatus(e.target.checked)}
                />
                <span className={styles.slider}></span>
              </label>
              <span className={styles.statusLabel}>
                {active ? 'Usuário Ativo' : 'Usuário Inativo'}
              </span>
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.btn}>
                <FaSave style={{ marginRight: '10px' }} />
                Salvar
              </button>
              <Link to="/menu" className={styles.btn}>
                <FaBars style={{ marginRight: '10px' }} />
                MENU
              </Link>

              {/* Botão de Alterar Senha, visível apenas para ADMIN ou SUPER_ADMIN */}
              {(role === 'ADMIN' || role === 'SUPER_ADMIN') && (
                <button
                  type="button"
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className={styles.btn}
                >
                  <FaKey style={{ marginRight: '10px' }} />
                  Alterar Senha
                </button>
              )}
            </div>
          </form>

          {/* Formulário de alteração de senha */}
          {showPasswordForm && (
            <div className={styles.changePasswordForm}>
              <h3><FaKey style={{ marginRight: '10px' }} /> Alterar Senha</h3>
              {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}
              {passwordSuccess && <div className={styles.successMessage}>{passwordSuccess}</div>}
              <form onSubmit={handleChangePassword}>
                <div className={styles.formGroup}>
                  <label htmlFor="password">Nova Senha</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword">Confirmar Senha</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.buttonGroup}>
                  <button type="submit" className={styles.btn}>
                    <FaKey style={{ marginRight: '10px' }} />
                    Alterar Senha
                  </button>
                  <button
                    type="button"
                    className={styles.btn}
                    onClick={() => setShowPasswordForm(false)}
                  >
                    <FaX style={{ marginRight: '10px' }} />
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
