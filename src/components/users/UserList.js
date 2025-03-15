// src/components/user/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);  // Para gerenciar o estado de carregamento
  const [error, setError] = useState(null);     // Para capturar e exibir erros


  useEffect(() => {
    // const token = localStorage.getItem('data'); // Obtém o token do localStorage
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlZGxhaW5lLm51bmVzckBnbWFpbC5jb20iLCJpYXQiOjE3NDIwNjIwODEsImV4cCI6MTc0MjA5ODA4MX0.jSehxEdo9SR8uTxmZhMG4tQc_kPf1wIaiS7QODHWMIY'

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
