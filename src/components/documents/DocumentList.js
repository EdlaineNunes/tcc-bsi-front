import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegFileAlt, FaDownload, FaUpload, FaBars, FaThList, FaSearch, FaFilter, FaCashRegister } from 'react-icons/fa';
import axios from "axios";
import Header from "../common/Header";
import { FaUsersLine } from "react-icons/fa6";

const DocumentsList = ({ token, userName, role, handleLogout }) => {
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`${API_URL}/files/all-files`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDocuments(response.data);
      } catch (error) {
        console.error("Erro ao buscar documentos:", error);
        if (error.response.status) {
          navigate(`/error/${error.response.status}`);
        } else {
          navigate('/error');
        }
      }
    };

    fetchDocuments();
  }, [token, navigate, API_URL]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.filename.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterType === 'all') {
      return matchesSearch;
    }
    return matchesSearch && doc.type === filterType;
  });

  const handleDownload = async (id, fileName) => {
    try {
      const response = await axios.get(`${API_URL}/files/download/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erro ao baixar documento:', error);
      if (error.response.status) {
        navigate(`/error/${error.response.status}`);
      } else {
        navigate('/error');
      }
    }
  };

  return (
    <div>
      <Header userName={userName} role={role} handleLogout={handleLogout} />
      <div className="container">
        <h2><FaThList style={{ marginRight: '10px' }} />Lista de Documentos</h2>

        <div className="filter-container" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <div className="filter-search" style={{ flex: 3, display: 'flex', alignItems: 'center' }}>
            <label htmlFor="search" style={{ marginRight: '10px' }}>
              <FaSearch />
              Buscar pelo Título:
            </label>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Digite o título do documento"
              style={{ padding: '5px', width: '100%' }}
            />
          </div>

          {role === "ADMIN" || role === "SUPER_ADMIN" || role === "COUNTER" ? (
            <div className="filter-type" style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <label htmlFor="filter" style={{ marginRight: '10px' }}>
                <FaFilter />
                Filtro de Tipo:
              </label>
              <select id="filter" value={filterType} onChange={handleFilterChange} style={{ padding: '5px', width: '100%' }}>
                <option value="all">Todos</option>
                <option value="FINANCIAL">Fiscal</option>
                <option value="PUBLIC">Público</option>
              </select>
            </div>
          ) : null}
        </div>

        {documents.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '18px', margin: '20px 0' }}>
            Ainda não existe o registro de nenhum documento.
          </p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Enviado por</th>
                <th>Data e Hora do Envio</th>
                {role === "ADMIN" || role === "SUPER_ADMIN" || role === "COUNTER" ? (
                  <th>Tipo</th>
                ) : null}
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.filename}</td>
                  <td>{doc.customerEmail}</td>
                  <td>{new Date(doc.createdAt).toLocaleString()}</td>
                  {role === "ADMIN" || role === "SUPER_ADMIN" || role === "COUNTER" ? (
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {doc.type === "FINANCIAL"
                          ? <>
                            <FaCashRegister style={{ marginRight: '10px' }} />
                            <p style={{ margin: 0 }}>Fiscal</p>
                          </>
                          : <>
                            <FaUsersLine style={{ marginRight: '10px' }} />
                            <p style={{ margin: 0 }}>Público</p>
                          </>
                        }
                      </div>
                    </td>
                  ) : null}
                  <td>
                    <div className="action-buttons">
                      <Link to={`/documents/view/${doc.id}`} className="btn btn-detail">
                        <FaRegFileAlt style={{ marginRight: '10px' }} />
                        Detalhes
                      </Link>
                      <button className="btn btn-download" onClick={() => handleDownload(doc.id, doc.filename)}>
                        <FaDownload style={{ marginRight: '10px' }} />
                        Baixar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="button-group">
          <Link to="/documents/upload" className="btn btn-upload">
            <FaUpload style={{ marginRight: '10px' }} />
            Upload Novo Documento
          </Link>
          <Link to="/menu" className="btn btn-menu">
            <FaBars style={{ marginRight: '10px' }} />
            MENU
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DocumentsList;
