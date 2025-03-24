import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const DocumentView = ({ token }) => {
  const { id } = useParams();
  const [doc, setDoc] = useState(null); // Mudança de "document" para "doc"
  console.log("Token DocumentView :: ", token);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/files/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoc(response.data); // Atualizando para "setDoc"
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao buscar documento:', error);
      }
    };

    fetchDocument();
  }, [id, token]);

  const handleDownload = async (documentId, versionIndex) => {
    try {
      const response = await axios.get(`http://localhost:8080/files/download-version/${documentId}/${versionIndex}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob', // Garantindo que o arquivo seja tratado como blob
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = window.document.createElement('a'); // Usando "window.document" para o objeto global
      link.href = url;
      link.setAttribute('download', `${doc.filename}`); // Nome do arquivo
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);

      alert('Download realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao baixar documento:', error);
      alert('Erro ao baixar o documento.');
    }
  };

  if (!doc) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container folha">
      <h2>Detalhes do Documento</h2>
      <div className="details-card">
        <p><strong>ID:</strong> {doc.id}</p>
        <p><strong>Nome:</strong> {doc.filename}</p>
        <p><strong>Email do Cliente:</strong> {doc.customerEmail}</p>
        <p><strong>Data de Criação:</strong> {new Date(doc.createdAt).toLocaleString()}</p>

        {doc.latestVersion && (
          <>
            <h3>Última Versão</h3>
            <p><strong>File ID:</strong> {doc.latestVersion.fileId}</p>
            <p><strong>Enviado em:</strong> {new Date(doc.latestVersion.uploadedAt).toLocaleString()}</p>
            <button onClick={() => handleDownload(doc.id, doc.versions.length - 1)}>Baixar Última Versão</button>
          </>
        )}

        {doc.versions && doc.versions.length > 0 && (
          <>
            <h3>Versões Anteriores</h3>
            <ul>
              {doc.versions.map((version, index) => (
                <li key={version.fileId}>
                  <strong>File ID:</strong> {version.fileId} - <strong>Enviado em:</strong> {new Date(version.uploadedAt).toLocaleString()}
                  <button onClick={() => handleDownload(doc.id, index)}>Baixar</button>
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
  );
};

export default DocumentView;
