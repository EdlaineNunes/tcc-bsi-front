import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/DocumentUpload.module.css';
import Header from '../common/Header'

const DocumentUpload = ({ token, userName, role, handleLogout }) => {
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  console.log("Token DocumentUpload :: ", token);

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
  })

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
      await axios.post(`${API_URL}/files/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Upload realizado com sucesso!');
      navigate('/menu');
    } catch (error) {
      console.error('Erro ao enviar documento:', error);
      console.error('Status:', error.response.status);
      if (error.response && error.response.status === 422) {
        alert('O documento precisa possuir uma extensão válida.\nEx: jpg, jpeg, png, pdf, xls, xlsx, doc, docx, csv ');
      } else {
        navigate(`/error/${error.response.status}`);
      }
    }
  };

  return (
    <div>
      <Header userName={userName} role={role} handleLogout={handleLogout} />
      <div className={styles["upload-container"]}>
        <div className={styles["upload-card"]}>
          <h2>Upload de Documento</h2>
          <p>Extensões aceitas: jpg, jpeg, png, pdf, xls, xlsx, doc, docx, csv.</p>
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
    </div>

  );
};

export default DocumentUpload;
