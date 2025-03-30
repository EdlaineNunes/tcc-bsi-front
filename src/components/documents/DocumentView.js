import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../common/Header';
import { FaDownload, FaUpload, FaBars, FaThList, FaInfoCircle, FaTrashAlt } from 'react-icons/fa';

const DocumentView = ({ token, userName, role, handleLogout }) => {
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const navigate = useNavigate();
  console.log("Token DocumentView :: ", token);

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    const fetchDocument = async () => {
      try {
        const response = await axios.get(`${API_URL}/files/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoc(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao buscar documento:', error);
        if (error.response.status) {
          navigate(`/error/${error.response.status}`);
        } else {
          navigate('/error');
        }
      }
    };

    fetchDocument();
  }, [id, token, navigate, API_URL]);

  const handleDownload = async (documentId, versionIndex, fileName) => {
    console.log("filename --> ", fileName);
    try {
      const response = await axios.get(`${API_URL}/files/download-version/${documentId}/${versionIndex}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob', // Garantindo que o arquivo seja tratado como blob
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = window.document.createElement('a'); // Usando "window.document" para o objeto global
      link.href = url;
      link.setAttribute('download', fileName); // Nome do arquivo
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);

    } catch (error) {
      console.error('Erro ao baixar documento:', error);
      if (error.response.status) {
        navigate(`/error/${error.response.status}`);
      } else {
        navigate('/error');
      }
    }
  };

  const handleDelete = async (documentId) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este documento permanentemente? A exclusão é irreversível.");
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/files/delete/${documentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Documento excluído com sucesso!');
        navigate('/documents/listAll');
      } catch (error) {
        console.error('Erro ao excluir documento:', error);
        if (error.response.status) {
          navigate(`/error/${error.response.status}`);
        } else {
          navigate('/error');
        }
      }
    }
  };

  if (!doc) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <Header userName={userName} role={role} handleLogout={handleLogout} />
      <div className="container folha">
        <h2><FaInfoCircle style={{ marginRight: '10px' }} />Detalhes do Documento</h2>
        <div className="details-card">
          <p><strong>ID:</strong> {doc.id}</p>
          <p><strong>Nome:</strong> {doc.filename}</p>
          <p><strong>Email do Cliente:</strong> {doc.customerEmail}</p>
          <p><strong>Data de Criação:</strong> {new Date(doc.createdAt).toLocaleString()}</p>
          <p><strong>Tipo:</strong>
            {doc.type == 'PUBLIC'
              ? " Público - Visível para todos os usuários autenticados"
              : " Fiscal - Visível apenas para ADM's e Contadores"
            }
          </p>

          {doc.latestVersion && (
            <>
              <br />
              <h3>Última Versão</h3>
              <p><strong>File ID:</strong> {doc.latestVersion.fileId}</p>
              <p><strong>Título:</strong> {doc.latestVersion.fileName}</p>
              <p><strong>Enviado em:</strong> {new Date(doc.latestVersion.uploadedAt).toLocaleString()}</p>
              <div className="button-container-view">
                <button
                  onClick={() => handleDownload(doc.id, doc.versions.length - 1, doc.latestVersion.fileName)}
                  className="action-button-view"
                >
                  <FaDownload style={{ marginRight: '10px' }} />
                  Baixar Última Versão
                </button>
                <button
                  onClick={() => navigate(`/documents/update/${id}`)}
                  className="action-button-view"
                >
                  <FaUpload style={{ marginRight: '10px' }} />
                  Adicionar Nova Versão
                </button>
              </div>
            </>
          )}

          {doc.versions && doc.versions.length > 0 && (
            <>
              <br />
              <h3>Todas as Versões</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {doc.versions.map((version, index) => (
                  <li key={version.fileId} style={{ marginBottom: '15px', paddingBottom: '10px' }}>
                    <strong>Título do documento:</strong> {version.fileName}
                    <br />
                    <strong>File ID:</strong> {version.fileId} - <strong>Enviado em:</strong> {new Date(version.uploadedAt).toLocaleString()}
                    <br />
                    <button
                      onClick={() => handleDownload(doc.id, index, version.fileName)}
                      style={{
                        display: 'block',
                        margin: '10px auto',
                        padding: '8px 12px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background 0.3s ease-in-out',
                        width: '120px',
                      }}
                    >
                      <FaDownload style={{ marginRight: '10px' }} />
                      Baixar</button>
                    {index !== doc.versions.length - 1 && <hr style={{ marginTop: '10px', border: '1px solid #ccc' }} />}
                  </li>
                ))}
              </ul>
            </>
          )}

          {doc.shareHistory && doc.shareHistory.length > 0 && (
            <>
              <h3>Histórico de Compartilhamento</h3>
              <table>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Permissão</th>
                    <th>Compartilhado Em</th>
                    <th>Compartilhado Por</th>
                  </tr>
                </thead>
                <tbody>
                  {doc.shareHistory.map((share) => (
                    <tr key={share.emailId}>
                      <td>{share.email}</td>
                      <td>{share.permissionLevel}</td>
                      <td>{new Date(share.sharedAt).toLocaleString()}</td>
                      <td>{share.sharedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* Exibição do botão de excluir apenas para SUPER_ADMIN */}
          {role === 'SUPER_ADMIN' && (
            <div className="delete-button-container">
              <button
                onClick={() => handleDelete(doc.id)}
                className="delete-button"
              >
                <FaTrashAlt style={{ marginRight: '10px' }} />
                Excluir Registro
              </button>
            </div>
          )}

          <br />
          <div className="button-group">
            <Link to="/documents/listAll">
              <FaThList style={{ marginRight: '10px' }} />
              Voltar para Lista Geral
            </Link>
            <Link to="/menu">
              <FaBars style={{ marginRight: '10px' }} />
              MENU
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentView;
