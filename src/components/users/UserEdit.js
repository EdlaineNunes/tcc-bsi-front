import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/UserEdit.module.css';

const UserEdit = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [permissionLevel, setPermissionLevel] = useState('');
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState(null);
  const [active, setActive] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setEmail('');
    setUsername('');
    setPermissionLevel('');
    setCpf('');
    setActive(null);

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
      });
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = { email, username, permissionLevel, active };

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

  return (
    <div className={styles.editContainer}>
      <div className={styles.editCard}>
        <h2>Editar Usuário</h2>

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
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />

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
            <option value="ADMIN">ADMIN - Admin do sistema</option>
            <option value="SUPER_ADMIN">SUPER_ADMIN - SuperAdmin do sistema</option>
          </select>

          <label>Status</label>
          <select
            value={active}
            onChange={(e) => setActive(e.target.value)}
            required
          >
            <option value="true">Ativo</option>
            <option value="false">Inativo</option>
          </select>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.btn}>Salvar</button>
            <Link to="/menu" className={styles.btn}>Voltar</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
