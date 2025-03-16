// src/components/user/UserList.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);  // Para gerenciar o estado de carregamento
  const [error, setError] = useState(null);     // Para capturar e exibir erros
  const navigate = useNavigate();

  useEffect(() => {
    // const token = localStorage.getItem('data'); // Obtém o token do localStorage
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlZGxhaW5lLm51bmVzckBnbWFpbC5jb20iLCJpYXQiOjE3NDIxNDY4OTEsImV4cCI6MTc0MjE4Mjg5MX0.G69xiezmUs4AB78tYZNdZo5Nm-BwZWuEfB9On6ozvVs'

    if (!token) {
      setError('Token não encontrado. Faça login novamente.');
      setLoading(false);
      console.log("cade o token mermao")
      return;
    }


    console.log("token recuperado ---> ", token)

    axios.get('http://localhost:8080/users/', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(response => {
      setUsers(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error("Erro ao buscar usuários:", error);
      setError("Erro ao carregar usuários.");
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Carregando usuários...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Permissão</th>
            <th>Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.cpf}</td>
              <td>{user.email}</td>
              <td>{user.permissionLevel}</td>
              <td>{user.active ? "✅ Sim" : "❌ Não"}</td>
              <td>
                <button onClick={() => navigate(`/users/edit/${user.id}`)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <li><Link to="/menu" >Menu</Link></li>
    </div>
  );
};

export default UserList;
