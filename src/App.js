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
import DocumentUpdate from './components/documents/DocumentUpdate';
import DocumentView from './components/documents/DocumentView';
import DocumentsListForMe from './components/documents/DocumentListForMe';
import ErrorPage from './components/common/ErrorPage'
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

        <Route path='/users/listAll' element={<UsersList token={token} userName={userName} role={role} handleLogout={handleLogout} />} />
        <Route path='/users/edit/:id' element={<UserEdit token={token} userName={userName} role={role} handleLogout={handleLogout} />} />
        <Route path='/users/create' element={<UserCreate token={token} userName={userName} role={role} handleLogout={handleLogout} />} />

        <Route path='/documents/listAll' element={<DocumentsList token={token} userName={userName} role={role} handleLogout={handleLogout} />} />
        <Route path='/documents/listAll/user' element={<DocumentsListForMe token={token} userName={userName} role={role} handleLogout={handleLogout} />} />
        <Route path='/documents/upload' element={<DocumentUpload token={token} userName={userName} role={role} handleLogout={handleLogout} />} />
        <Route path='/documents/view/:id' element={<DocumentView token={token} userName={userName} role={role} handleLogout={handleLogout} />} />
        <Route path='/documents/update/:id' element={<DocumentUpdate token={token} userName={userName} role={role} handleLogout={handleLogout} />} />

        <Route path="/error/:status?" element={<ErrorPage token={token} userName={userName} role={role} handleLogout={handleLogout} />} />
        <Route path="*" element={<ErrorPage token={token} userName={userName} role={role} handleLogout={handleLogout} />} />
      </Routes>
    </Router>
  );
}

export default App;
