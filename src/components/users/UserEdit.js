import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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

    const updatedUser = { email, username, permissionLevel };

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
    <div className="edit-container">
      <h2>Editar Usuário</h2>

      {error && <div className="message error">{error}</div>}
      {success && <div className="message success">Usuário atualizado com sucesso!</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>CPF</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>
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
        </div>
        <div>
          <label>Status</label>
          <select
            value={active}
            onChange={(e) => setActive(e.target.value)}
            required
          >
            <option value="true">Ativo</option>
            <option value="false">Inativo</option>
          </select>
        </div>
        <div className="button-group">
          <button type="submit" className="btn">Salvar Alterações</button>
          <Link to="/menu" className="btn">Menu</Link>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
