import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DocumentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filename, setFilename] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/documents/${id}`)
      .then(response => setFilename(response.data.filename))
      .catch(error => console.error('Erro ao carregar documento:', error));
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/documents/${id}`, { filename });
      navigate('/documents');
    } catch (error) {
      console.error('Erro ao editar documento:', error);
    }
  };

  return (
    <div>
      <h2>Editar Documento</h2>
      <form onSubmit={handleSave}>
        <label>Nome do Documento:</label>
        <input 
          type="text" 
          value={filename} 
          onChange={(e) => setFilename(e.target.value)} 
          required 
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default DocumentEdit;
