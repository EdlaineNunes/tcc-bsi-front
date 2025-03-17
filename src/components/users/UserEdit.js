import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [permissionLevel, setPermissionLevel] = useState('');
  const [cpf, setCpf] = useState('')
  const [error, setError] = useState(null);
  const [active, setActive] = useState(null)
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setEmail('');
    setUsername('');
    setPermissionLevel('');
    setCpf('');
    setActive(null);

    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlZGxhaW5lLm51bmVzckBnbWFpbC5jb20iLCJpYXQiOjE3NDIxODM4NjMsImV4cCI6MTc0MjIxOTg2M30.j3AmsJIkdovgs_8pqpP4EGDS_-crNn7slkbGbrNX8Fo'

    axios.get(`http://localhost:8080/users/${id}`, 
      {
        headers: {
          "Authorization": `Bearer ${token}`,  // Adiciona o token no cabeçalho
        },
      }
    )  // Ajustado para o mesmo endpoint do UserList
      .then((response) => {
        const { email, username, permissionLevel, cpf, active } = response.data;
        setEmail(email);
        setUsername(username);
        setPermissionLevel(permissionLevel);
        setCpf(cpf)
        setActive(active)
      })
      .catch((error) => {
        console.error('Erro ao carregar usuário:', error);
        setError('Erro ao carregar usuário.');
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlZGxhaW5lLm51bmVzckBnbWFpbC5jb20iLCJpYXQiOjE3NDIxODM4NjMsImV4cCI6MTc0MjIxOTg2M30.j3AmsJIkdovgs_8pqpP4EGDS_-crNn7slkbGbrNX8Fo'

    const updatedUser = { email, username, permissionLevel };

    try {
      await axios.put(`http://localhost:8080/users/${id}`, updatedUser,
        {
          headers: {
            "Authorization": `Bearer ${token}`,  // Adiciona o token no cabeçalho
          },
        }
      );  // Ajuste para o mesmo endpoint
      setSuccess(true);
      setTimeout(() => navigate('/users/listAll'), 2000); // Redireciona após 2 segundos
    } catch (error) {
      setError('Erro ao editar usuário.');
      console.error('Erro ao editar usuário:', error);
    }
  };

  return (
    <div>
      <h2>Editar Usuário</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Usuário atualizado com sucesso!</div>}
      
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
          <label>Cpf</label>
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
          <label>Role</label>
          <select 
            value={permissionLevel} 
            onChange={(e) => setPermissionLevel(e.target.value)} 
            required
          >
            <option value="GUEST">GUEST - Convidado</option>
            <option value="USER">USER - Usuário comum</option>
            <option value="ADMIN">ADMIN - Admin do sitema</option>
            <option value="SUPER_ADMIN">SUPER_ADMIN - SuperAdmin do sitema</option>
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
        <button type="submit">Salvar Alterações</button>
      </form>
      <li><Link to="/menu" >Menu</Link></li>
    </div>
  );
};

export default UserEdit;
