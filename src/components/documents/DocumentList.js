import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DocumentsList = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/documents')
      .then((response) => setDocuments(response.data))
      .catch((error) => console.error('Erro ao carregar documentos:', error));
  }, []);

  return (
    <div>
      <h2>Lista de Documentos</h2>
      <table>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/documents/upload">Upload Novo Documento</Link>
    </div>
  );
};

export default DocumentsList;
