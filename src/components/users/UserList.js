// src/components/user/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);  // Para gerenciar o estado de carregamento
  const [error, setError] = useState(null);     // Para capturar e exibir erros


  useEffect(() => {
    const token = localStorage.getItem('data'); // Obtém o token do localStorage
   

    if (!token) {
      setError('Token não encontrado. Faça login novamente.');
      setLoading(false);
      console.log("cade o token mermao")
      return;
    }


    console.log("token recuperado ---> ", token)

    axios.get('http://localhost:8080/users', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => { console.log("usuarios achados", response); setUsers(response.data).setLoading(false) })
      .catch((error) => console.error(error));
  }, []);

  if (loading) {
    return <div>Carregando usuários...</div>; // Exibe uma mensagem enquanto os usuários são carregados
  }

  return (
    <div>
      <h2>Usuários</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.email} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
