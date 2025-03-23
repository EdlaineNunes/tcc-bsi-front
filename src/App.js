import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Login from './components/auth/Login';
import UsersList from './components/users/UserList';
import UserEdit from './components/users/UserEdit';
import UserCreate from './components/users/UserCreate';
import DocumentsList from './components/documents/DocumentList';
import DocumentsListForMe from './components/documents/DocumentListForMe';
import Menu from './components/Menu';
import DocumentUpload from './components/documents/DocumentUpload';
import DocumentView from './components/documents/DocumentView';
import './components/styles/global.css';

function App() {
  const [token, setToken] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path='/menu' element={<Menu token={token} />} />

        <Route path='/users/listAll' element={<UsersList token={token} />} />
        <Route path='/users/edit/:id' element={<UserEdit token={token} />} />
        <Route path='/users/create' element={<UserCreate token={token} />} />

        <Route path='/documents/listAll' element={<DocumentsList token={token} />} />
        <Route path='/documents/listAll/user' element={<DocumentsListForMe token={token} />} />
        <Route path='/documents/upload' element={<DocumentUpload token={token} />} />
        <Route path='/documents/view/:id' element={<DocumentView token={token} />} />

      </Routes>
    </Router>

  );
}

export default App;


