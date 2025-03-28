import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/DocumentUpload.module.css';
import Header from '../common/Header'

const DocumentUpload = ({ token, userName, role, handleLogout }) => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  console.log("Token DocumentUpdate :: ", token);

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
      await axios.post(`http://localhost:8080/files/upload/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Update realizado com sucesso!');
      navigate('/documents/listAll');
    } catch (error) {
      console.error('Erro ao enviar documento:', error);
      alert('Erro ao enviar o documento.');
    }
  };

  return (
    <div>
      <Header userName={userName} role={role} handleLogout={handleLogout} />
      <div className={styles["upload-container"]}>
        <div className={styles["upload-card"]}>
          <h2>Update de Documento</h2>
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
