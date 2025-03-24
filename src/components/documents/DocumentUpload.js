import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DocumentUpload = ({ token }) => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  console.log("Token DocumentUpload :: ", token);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Selecione um arquivo para fazer o upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:8080/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Upload realizado com sucesso!');
      navigate('/documents/listAll');
    } catch (error) {
      console.error('Erro ao enviar documento:', error);
      alert('Erro ao enviar o documento.');
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload de Documento</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" className="btn btn-upload">Enviar</button>
      </form>
      <button onClick={() => navigate('/menu')} className="btn btn-menu">Voltar</button>
    </div>
  );
};

export default DocumentUpload;
