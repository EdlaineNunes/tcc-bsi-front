import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DocumentEdit = ({ token }) => {
  console.log("Token DocumentEdit :: ", token)
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [filename, setFilename] = useState('');

  useEffect(() => {

    if (!token) {
      navigate('/');
      return;
    }

    axios.get(`${API_URL}/api/documents/${id}`)
      .then(response => setFilename(response.data.filename))
      .catch(error => console.error('Erro ao carregar documento:', error));
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_URL}/api/documents/${id}`, { filename });
      navigate('/documents');
    } catch (error) {
      console.error('Erro ao editar documento:', error);
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>Editar Documento</h2>
        <form className="form" onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="filename">Nome do Documento:</label>
            <input
              id="filename"
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              required
              placeholder="Digite o nome do documento"
            />
          </div>
          <div className="button-group">
            <button type="submit">Salvar</button>
            <button type="button" onClick={() => navigate('/documents')}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentEdit;