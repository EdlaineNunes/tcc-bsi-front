import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DocumentShare = ({ token }) => {
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  console.log("Token DocumentShare :: ", token)

  const handleShare = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/api/documents/share/${id}`, null, {
        params: { email }
      });
      alert('Documento compartilhado com sucesso!');
      navigate('/documents');
    } catch (error) {
      console.error('Erro ao compartilhar documento:', error);
    }
  };

  return (
    <div>
      <h2>Compartilhar Documento</h2>
      <form onSubmit={handleShare}>
        <label>Email do destinatário:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Compartilhar</button>
      </form>
    </div>
  );
};

export default DocumentShare;
