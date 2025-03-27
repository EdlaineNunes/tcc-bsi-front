import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './components/auth/Login';
import RegisterUser from './components/auth/RegisterUser';
import UsersList from './components/users/UserList';
import UserEdit from './components/users/UserEdit';
import UserCreate from './components/users/UserCreate';
import DocumentsList from './components/documents/DocumentList';
import DocumentsListForMe from './components/documents/DocumentListForMe';
import Menu from './components/Menu';
import DocumentUpload from './components/documents/DocumentUpload';
import DocumentView from './components/documents/DocumentView';
import './components/styles/global.css';
import ErrorPage from './components/common/ErrorPage';

function App() {
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const handleLoginSuccess = async (receivedToken) => {
    setToken(receivedToken);

    try {
      const response = await axios.get('http://localhost:8080/auth/me', {
        headers: { Authorization: `Bearer ${receivedToken}` },
      });
      setUserInfo(response.data); // { name, role }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      setUserInfo(null);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path='/menu' element={<Menu token={token} userInfo={userInfo} />} />

        <Route path='/users/listAll' element={<UsersList token={token} userInfo={userInfo} />} />
        <Route path='/users/edit/:id' element={<UserEdit token={token} userInfo={userInfo} />} />
        <Route path='/users/create' element={<UserCreate token={token} userInfo={userInfo} />} />

        <Route path='/documents/listAll' element={<DocumentsList token={token} userInfo={userInfo} />} />
        <Route path='/documents/listAll/user' element={<DocumentsListForMe token={token} userInfo={userInfo} />} />
        <Route path='/documents/upload' element={<DocumentUpload token={token} userInfo={userInfo} />} />
        <Route path='/documents/view/:id' element={<DocumentView token={token} userInfo={userInfo} />} />

        <Route path='/register' element={<RegisterUser token={token} userInfo={userInfo} />} />
        <Route path='/error' element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage status={404} />} />
      </Routes>
    </Router>
  );
}

export default App;
