import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/DocumentUpload.module.css';
import Header from '../common/Header';
import { FaSave, FaUpload } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

const DocumentUpload = ({ token, userName, role, handleLogout }) => {
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [documentType, setDocumentType] = useState('PUBLIC');

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTypeChange = (e) => {
    setDocumentType(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Selecione um arquivo para fazer o upload.');
      return;
    }

    if (isPrivilegedUser() && !documentType) {
      alert('Por favor, selecione o tipo de documento.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${API_URL}/files/upload?type=${documentType}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Upload realizado com sucesso!');
      navigate('/menu');
    } catch (error) {
      console.error('Erro ao enviar documento:', error);
      if (error.response && error.response.status === 422) {
        alert('O documento precisa possuir uma extensão válida.\nEx: jpg, jpeg, png, pdf, xls, xlsx, doc, docx, csv.');
      } else {
        navigate(`/error/${error.response.status}`);
      }
    }
  };

  const isPrivilegedUser = () => {
    return ['ADMIN', 'SUPER_ADMIN', 'COUNTER'].includes(role);
  };

  return (
    <div>
      <Header userName={userName} role={role} handleLogout={handleLogout} />
      <div className={styles["upload-container"]}>
        <div className={styles["upload-card"]}>
          <h2><FaUpload style={{ marginRight: '10px' }} />Upload de Documento</h2>
          <p>Extensões aceitas: jpg, jpeg, png, pdf, xls, xlsx, doc, docx, csv.</p>

          {isPrivilegedUser() && (
            <div className={styles["document-type-info"]}>
              <p>
                <strong>Escolha o tipo de documento:</strong><br />
                <strong>📂 PUBLIC:</strong> Visível para todos os usuários (exceto Guest).<br />
                <strong>🔒 FINANCIAL:</strong> Restrito a ADMIN, SUPER_ADMIN e COUNTER.
              </p>
              <select value={documentType} onChange={handleTypeChange} required>
                <option value="">Selecione...</option>
                <option value="PUBLIC">PUBLIC</option>
                <option value="FINANCIAL">FINANCIAL</option>
              </select>
            </div>
          )}

          <form onSubmit={handleUpload}>
            <input type="file" onChange={handleFileChange} />
            <div className={styles["button-group"]}>
              <button
                type="submit"
                className={`btn ${styles["btn-upload"]}`}
              >
                <FaSave style={{ marginRight: '10px' }} />
                Salvar
              </button>
              <button type="button"
                onClick={() => navigate('/menu')}
                className={`btn ${styles["btn-menu"]}`}
              >
                <FaX style={{ marginRight: '10px' }} />
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
