// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/auth/Login';
import RegisterUser from './components/auth/RegisterUser';
import Menu from './components/Menu';
import UsersList from './components/users/UserList';
import UserEdit from './components/users/UserEdit';
import UserCreate from './components/users/UserCreate';
import DocumentsList from './components/documents/DocumentList';
import DocumentUpload from './components/documents/DocumentUpload';
import DocumentView from './components/documents/DocumentView';
import DocumentsListForMe from './components/documents/DocumentListForMe';
import './components/styles/global.css';


function App() {
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');

  const handleLogin = (receivedToken) => {
    const decodedToken = JSON.parse(atob(receivedToken.split('.')[1]));
    setToken(receivedToken);
    setUserName(decodedToken.sub);
    setRole(decodedToken.role);
  };

  const handleLogout = () => {
    setToken('');
    setUserName('');
    setRole('');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setToken={handleLogin} />} />
        <Route path="/register" element={<RegisterUser setToken={handleLogin} />} />
        <Route path='/menu' element={<Menu token={token} userName={userName} role={role} handleLogout={handleLogout} />} />
        <Route path='/users/listAll' element={<UsersList token={token} userName={userName} role={role} />} />
        <Route path='/users/edit/:id' element={<UserEdit token={token} userName={userName} role={role} />} />
        <Route path='/users/create' element={<UserCreate token={token} userName={userName} role={role} />} />
        <Route path='/documents/listAll' element={<DocumentsList token={token} userName={userName} role={role} />} />
        <Route path='/documents/listAll/user' element={<DocumentsListForMe token={token} userName={userName} role={role} />} />
        <Route path='/documents/upload' element={<DocumentUpload token={token} userName={userName} role={role} />} />
        <Route path='/documents/view/:id' element={<DocumentView token={token} userName={userName} role={role} />} />
      </Routes>
    </Router>
  );
}

export default App;
