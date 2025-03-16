// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/auth/Login';
// import Register from './components/auth/Register';
// import UsersList from './components/users/UserList';
// import UserCreate from './components/users/UserCreate';
// import UserEdit from './components/users/UserEdit';
// import DocumentsList from './components/documents/DocumentList';
// import DocumentUpload from './components/documents/DocumentUpload';
// import DocumentEdit from './components/documents/DocumentEdit';
// import DocumentShare from './components/documents/DocumentShare';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Login */}
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register/>} />

//         {/* Usuários */}
//         <Route path="/users" element={<UsersList />} />
//         <Route path="/users/create" element={<UserCreate />} />
//         <Route path="/users/edit/:id" element={<UserEdit />} />

//         {/* Documentos */}
//         <Route path="/documents" element={<DocumentsList />} />
//         <Route path="/documents/upload" element={<DocumentUpload />} />
//         <Route path="/documents/edit/:id" element={<DocumentEdit />} />
//         <Route path="/documents/share/:id" element={<DocumentShare />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Login from './components/auth/Login';
import UsersList from './components/users/UserList';
import UserEdit from './components/users/UserEdit';
import UserCreate from './components/users/UserCreate';
import DocumentsList from './components/documents/DocumentList';
import Menu from './components/Menu';

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path='/usuarios' element={<UsersList />} />
          
//           {/* Rotas protegidas */}
//           <Route path="/dashboard" element={<PrivateRoute><h1>Dashboard</h1></PrivateRoute>} />
//           <Route path="/users" element={<PrivateRoute><UsersList /></PrivateRoute>} />
//           <Route path="/documents" element={<PrivateRoute><DocumentsList /></PrivateRoute>} />
//         </Routes>
//       </AuthProvider>
//     </Router>
    
//   );
// }

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/menu' element={<Menu />} />

        <Route path='/users/listAll' element={<UsersList />} />
        <Route path='/users/edit/:id' element={<UserEdit />} />
        <Route path='/users/create' element={<UserCreate />} />
        
        <Route path='/documents/listAll' element={<DocumentsList />} />



        {/* Rotas protegidas */}
        <Route path="/dashboard" element={<PrivateRoute><h1>Dashboard</h1></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><UsersList /></PrivateRoute>} />
        <Route path="/documents" element={<PrivateRoute><DocumentsList /></PrivateRoute>} />
      </Routes>
    </Router>
    
  );
}

export default App;


