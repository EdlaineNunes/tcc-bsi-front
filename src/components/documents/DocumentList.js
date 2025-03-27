import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../common/Header";

const DocumentsList = ({ token, userName, role }) => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get("http://localhost:8080/files/all-files", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDocuments(response.data);
      } catch (error) {
        console.error("Erro ao buscar documentos:", error);
        if (error.response) {
          navigate("/error", { state: { status: error.response.status } });
        } else {
          navigate("/error", { state: { status: "default" } });
        }
      }
    };

    fetchDocuments();
  }, [token, navigate]);

  const handleDownload = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/files/download/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `documento-${id}.pdf`);
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
      <Header userName={userName} role={role} />
      <div className="container">
        <h2>Lista de Documentos</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Data de Criação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.id}</td>
                <td>{doc.filename}</td>
                <td>{new Date(doc.createdAt).toLocaleString()}</td>
                <td>
                  <div className="action-buttons">
                    <Link to={`/documents/view/${doc.id}`} className="btn btn-detail">
                      Detalhes
                    </Link>
                    <button className="btn btn-download" onClick={() => handleDownload(doc.id)}>
                      Baixar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="button-group">
          <Link to="/documents/upload" className="btn btn-upload">
            Upload Novo Documento
          </Link>
          <Link to="/menu" className="btn btn-menu">
            MENU
          </Link>
        </div>
      </div>
    </div>

  );
};

export default DocumentsList;
