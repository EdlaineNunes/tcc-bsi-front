import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert("Selecione um arquivo para fazer o upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:8080/api/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate('/documents');
    } catch (error) {
      console.error("Erro ao enviar documento:", error);
    }
  };

  return (
    <div>
      <h2>Upload de Documento</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default DocumentUpload;
