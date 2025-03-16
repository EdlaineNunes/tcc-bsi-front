import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Envia os dados como query parameters
      const response = await axios.post(
        `http://localhost:8080/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      );

      console.log("response atual", response.data)
      localStorage.setItem('data', JSON.stringify(response.data)); // Certifique-se de usar 'data'

      // localStorage.setItem('token', response.data); // Armazena o token no navegador
      alert('sucesso.');
      console.log("iniciando chamada get usuarios. token -> ", response.data)

      navigate('/menu'); // Redireciona para o painel principal
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Login falhou. Verifique suas credenciais.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Senha:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
