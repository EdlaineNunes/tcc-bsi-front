import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Adicionando um estado de loading
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('data');

    if (userData) {
      const parsedData = JSON.parse(userData)
      const token = parsedData.token
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          logout();
        } else {
          axios
            .get('http://localhost:8080/auth/login', {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
              setUser(response.data);
              setLoading(false);
            })
            .catch(() => logout());
        }
      } catch (error) {
        logout();
      }
    } else {
      setLoading(false)
    }
  }, [navigate]); // ✅ Adiciona `navigate` nas dependências para evitar erro

  const login = (userData) => {
    localStorage.setItem('data', JSON.stringify(userData));
    const token = userData.token
    const decoded = jwtDecode(token);

    if (decoded.exp < Date.now() / 1000) {
      logout();
    } else {
      axios
        .get('http://localhost:8080/auth/login', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          setUser(response.data);
          setLoading(false); // Assegura que o carregamento terminou
          navigate('/usuarios'); // Redireciona após login bem-sucedido
        })
        .catch(() => logout());
    }
  };

  const logout = () => {
    localStorage.removeItem('data');
    setUser(null);
    setLoading(false);
    navigate('/login'); // ✅ Agora funciona corretamente
  };

  if (loading) {
    return <div>Carregando...</div>; // Exibe uma mensagem enquanto carrega
  }
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
