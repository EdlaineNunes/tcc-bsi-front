import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../common/Header'

const DocumentView = ({ token, userName, role, handleLogout }) => {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const navigate = useNavigate()
  console.log("Token DocumentView :: ", token);

  useEffect(() => {

    if (!token) {
      navigate('/');
      return;
    }

    const fetchDocument = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/files/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoc(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao buscar documento:', error);
      }
    };

    fetchDocument();
  }, [id, token]);

  const handleDownload = async (documentId, versionIndex, fileName) => {
    try {
      const response = await axios.get(`http://localhost:8080/files/download-version/${documentId}/${versionIndex}`, {
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
      alert('Erro ao baixar o documento.');
    }
  };

  if (!doc) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <Header userName={userName} role={role} handleLogout={handleLogout} />
      <div className="container folha">
        <h2>Detalhes do Documento</h2>
        <div className="details-card">
          <p><strong>ID:</strong> {doc.id}</p>
          <p><strong>Nome:</strong> {doc.filename}</p>
          <p><strong>Email do Cliente:</strong> {doc.customerEmail}</p>
          <p><strong>Data de Criação:</strong> {new Date(doc.createdAt).toLocaleString()}</p>

          {doc.latestVersion && (
            <>
              <br />
              <h3>Última Versão</h3>
              <p><strong>File ID:</strong> {doc.latestVersion.fileId}</p>
              <p><strong>Título:</strong> {doc.latestVersion.fileName}</p>
              <p><strong>Enviado em:</strong> {new Date(doc.latestVersion.uploadedAt).toLocaleString()}</p>
              <br />
              <button onClick={() => handleDownload(doc.id, doc.versions.length - 1, doc.latestVersion.fileName)}>Baixar Última Versão</button>
              <button onClick={() => navigate(`/documents/update/${id}`)}>Adicionar Nova Versão</button>
            </>
          )}

          {doc.versions && doc.versions.length > 0 && (
            <>
              <br /><br />
              <h3>Versões Anteriores</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {doc.versions.map((version, index) => (
                  <li key={version.fileId} style={{ marginBottom: '15px', paddingBottom: '10px' }}>
                    <strong>Título do documento:</strong> {version.fileName}
                    <br />
                    <strong>File ID:</strong> {version.fileId} - <strong>Enviado em:</strong> {new Date(version.uploadedAt).toLocaleString()}
                    <br />
                    <button
                      onClick={() => handleDownload(doc.id, index, doc.fileName)}
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
                    > 📥 Baixar</button>
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

          <br />
          <div className="button-group">
            <Link to="/documents/listAll">Voltar para Lista</Link>
            <Link to="/menu">MENU</Link>
          </div>
        </div>
      </div>
    </div>

  );
};

export default DocumentView;
