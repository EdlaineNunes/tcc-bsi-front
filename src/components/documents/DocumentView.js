import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const DocumentView = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlZGxhaW5lLm51bmVzckBnbWFpbC5jb20iLCJpYXQiOjE3NDI1MDQ5OTIsImV4cCI6MTc0MjU0MDk5Mn0.fGcyoKT10aO9imIwjk3kEoOEuRHivswR9_8Y2si-YjQ';

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/files/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDocument(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao buscar documento:', error);
      }
    };

    fetchDocument();
  }, [id]);

  const handleDownload = async (fileId) => {
    try {
      const response = await axios.get(`http://localhost:8080/files/download/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${document.filename}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erro ao baixar documento:', error);
      alert('Erro ao baixar o documento.');
    }
  };

  if (!document) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container folha">
      <h2>Detalhes do Documento</h2>
      <div className="details-card">
        <p><strong>ID:</strong> {document.id}</p>
        <p><strong>Nome:</strong> {document.filename}</p>
        <p><strong>Email do Cliente:</strong> {document.customerEmail}</p>
        <p><strong>Data de Criação:</strong> {new Date(document.createdAt).toLocaleString()}</p>

        {document.latestVersion && (
          <>
            <h3>Última Versão</h3>
            <p><strong>File ID:</strong> {document.latestVersion.fileId}</p>
            <p><strong>Enviado em:</strong> {new Date(document.latestVersion.uploadedAt).toLocaleString()}</p>
            <button onClick={() => handleDownload(document.latestVersion.fileId)}>Baixar Última Versão</button>
          </>
        )}

        {document.versions && document.versions.length > 0 && (
          <>
            <h3>Versões Anteriores</h3>
            <ul>
              {document.versions.map((version) => (
                <li key={version.fileId}>
                  <strong>File ID:</strong> {version.fileId} - <strong>Enviado em:</strong> {new Date(version.uploadedAt).toLocaleString()}
                  <button onClick={() => handleDownload(version.fileId)}>Baixar</button>
                </li>
              ))}
            </ul>
          </>
        )}

        {document.shareHistory && document.shareHistory.length > 0 && (
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
                {document.shareHistory.map((share) => (
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
  );
};

export default DocumentView;
