import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/UserEdit.module.css';
import Header from '../common/Header';
import { FaSave, FaEdit, FaBars } from 'react-icons/fa';
import CPFInput from "../common/CPFInput";

const UserEdit = ({ token, userName, role, handleLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [permissionLevel, setPermissionLevel] = useState('');
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState(null);
  const [active, setActive] = useState(false);
  const [success, setSuccess] = useState(false);

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

    console.log("TokenUserEdit :: ", token);

    axios.get(`http://localhost:8080/users/${id}`, {
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
      await axios.put(`http://localhost:8080/users/${id}`, updatedUser, {
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
      const url = `http://localhost:8080/users/${id}/${status ? 'enable' : 'disable'}`;

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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
