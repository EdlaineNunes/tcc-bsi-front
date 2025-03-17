import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DocumentsList = () => {
  const [documents, setDocuments] = useState([]);
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NDIxNzUyMTEsImV4cCI6MTc0MjIxMTIxMX0.rjp_rK_r5uLDgHV3_vIJF5dcgrudgYl25GT8PO1nBV8'

  useEffect(() => {
    
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/files/my-files', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDocuments(response.data);
      } catch (error) {
        console.error('Erro ao buscar documentos:', error);
      }
    };

    fetchDocuments();
  }, []);

  const handleDownload = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/files/download/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // Importante para baixar arquivos binários
      });

      // Criar um link para o arquivo e fazer o download automaticamente
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `documento-${id}.pdf`); // Ajuste para o tipo correto
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erro ao baixar documento:', error);
      alert('Erro ao baixar o documento.');
    }
  };

  return (
    <div>
      <h2>Lista de Documentos</h2>
      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {documents.map(doc => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.filename}</td>
              <td>{new Date(doc.createdAt).toLocaleString()}</td>
              <td>
                <Link to={`/documents/view/${doc.id}`}>Visualizar</Link> | 
                <Link to={`/documents/edit/${doc.id}`}>Editar</Link> | 
                <Link to={`/documents/share/${doc.id}`}>Compartilhar</Link>
                <button onClick={() => handleDownload(doc.id)}>Baixar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/documents/upload">Upload Novo Documento</Link>
      <br />
      <Link to="/menu">MENU</Link>     
    </div>
  );
};

export default DocumentsList;
