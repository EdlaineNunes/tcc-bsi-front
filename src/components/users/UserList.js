import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../common/Header";
import { FaThList, FaEdit, FaBars, FaSearch, FaFilter } from 'react-icons/fa';

const formatCPF = (cpf) => {
  if (!cpf) return "";
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

const UserList = ({ token, userName, role, handleLogout }) => {
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError('Token não encontrado. Faça login novamente.');
      setLoading(false);
      navigate('/');
      return;
    }

    axios.get(`${API_URL}/users/`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar usuários:", error);
        setError("Erro ao carregar usuários.");
        if (error.response) {
          navigate('/error', { state: { status: error.response.status } });
        } else {
          navigate('/error', { state: { status: 'default' } });
        }
        setLoading(false);
      });
  }, [token, navigate]);

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtrar usuários com base na opção de status e nome
  const filteredUsers = users.filter(user => {
    const matchesStatus = filterStatus === "all" || (filterStatus === "active" ? user.active : !user.active);
    const matchesSearchQuery = user.username.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearchQuery;
  });

  if (loading) return <div>Carregando usuários...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <Header userName={userName} role={role} handleLogout={handleLogout} />
      <div className="container">
        <h2><FaThList style={{ marginRight: '10px' }} />Lista de Usuários</h2>

        {/* Filtro abaixo do título e acima da tabela */}
        <div className="filter-container">
          <label htmlFor="search">
            <FaSearch style={{ marginRight: '10px' }} />
            Buscar por nome:
          </label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Digite o nome do usuário"
          />
          <label htmlFor="filter">
            <FaFilter style={{ marginRight: '10px' }} />
            Filtrar por status:
          </label>
          <select id="filter" value={filterStatus} onChange={handleFilterChange}>
            <option value="all">Todos</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </select>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Nome</th>
                <th>CPF</th>
                <th>Email</th>
                <th>Permissão</th>
                <th>Ativo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  {/* <td>{user.id}</td> */}
                  <td>{user.username}</td>
                  <td>{formatCPF(user.cpf)}</td>
                  <td>{user.email}</td>
                  <td>{user.permissionLevel}</td>
                  <td>{user.active ? "✅" : "❌"}</td>
                  <td>
                    <button className="btn-detail" onClick={() => navigate(`/users/edit/${user.id}`)}>
                      <FaEdit style={{ marginRight: '10px' }} />
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="button-group">
          <Link to="/menu" className="btn-menu">
            <FaBars style={{ marginRight: '10px' }} />
            MENU
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserList;
