import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/DocumentUpload.module.css';

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
    <div className={styles["upload-container"]}>
      <div className={styles["upload-card"]}>
        <h2>Upload de Documento</h2>
        <form onSubmit={handleUpload}>
          <input type="file" onChange={handleFileChange} />
          <div className={styles["button-group"]}>
            <button type="submit" className={`btn ${styles["btn-upload"]}`}>Enviar</button>
            <button
              type="button"
              onClick={() => navigate('/menu')}
              className={`btn ${styles["btn-menu"]}`}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentUpload;
