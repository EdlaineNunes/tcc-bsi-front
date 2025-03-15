import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/users/${id}`)  // Ajuste o endpoint conforme sua API
      .then((response) => {
        const { email, name, role } = response.data;
        setEmail(email);
        setName(name);
        setRole(role);
      })
      .catch((error) => console.error('Erro ao carregar usuário:', error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = { email, name, role };

    try {
      await axios.put(`http://localhost:8080/users/${id}`, updatedUser);  // Ajuste o endpoint conforme sua API
      navigate('/users');
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
    }
  };

  return (
    <div>
      <h2>Editar Usuário</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Nome</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Role</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            required
          >
            <option value="USER">Usuário</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default UserEdit;
