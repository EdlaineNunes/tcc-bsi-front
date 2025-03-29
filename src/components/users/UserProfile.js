import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../common/Header';
import styles from '../styles/UserProfile.module.css';
import { FaBars, FaRegUserCircle, FaUserEdit, FaKey } from 'react-icons/fa';

import { FaX } from 'react-icons/fa6';

const UserProfile = ({ token, userId, role }) => {
    const API_URL = process.env.REACT_APP_BACKEND_URL;

    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            setError('ID do usuário não encontrado.');
            return;
        }

        axios.get(`${API_URL}/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => setUserData(response.data))
            .catch((err) => {
                setError('Erro ao carregar os dados do usuário');
                console.error(err);
            });
    }, [token, userId]);

    const handleChangePassword = async (e) => {
        e.preventDefault();

        // Verifica se as senhas são iguais
        if (password !== confirmPassword) {
            setPasswordError('As senhas não coincidem.');
            setPasswordSuccess('');
            return;
        }

        try {
            const response = await axios.put(
                `${API_URL}/users/${userId}`,
                password,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                setPasswordSuccess('Senha alterada com sucesso!');
                setPasswordError('');
                setShowChangePasswordForm(false);  // Fecha o formulário após sucesso
            }
        } catch (error) {
            setPasswordError('Erro ao alterar a senha.');
            setPasswordSuccess('');
        }
    };

    if (error) return <div className="error-message">{error}</div>;
    if (!userData) return <div className="error-message">Carregando...</div>;

    return (
        <div>
            <Header userName={userData.username} role={role} handleLogout={() => { }} />

            <div className="container">
                <div className={styles.profileContainer}>
                    <h1 style={{ color: '#007bff' }}>
                        <FaRegUserCircle style={{ marginRight: '10px' }} />
                        Meu Perfil
                    </h1>
                    <div className={styles.detailsCard}>
                        <p><strong>Nome:</strong> {userData.username}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Permissão:</strong> {userData.permissionLevel}</p>
                        <p><strong>Status:</strong> {userData.active ? 'Ativo' : 'Inativo'}</p>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button onClick={() => navigate(`/users/edit/${userId}`)} className="btn">
                            <FaUserEdit style={{ marginRight: '10px' }} />
                            Editar Perfil
                        </button>
                        <button onClick={() => setShowChangePasswordForm(true)} className="btn">
                            <FaKey style={{ marginRight: '10px' }} />
                            Alterar Senha
                        </button>
                        <button onClick={() => navigate(`/menu`)} className="btn">
                            <FaBars style={{ marginRight: '10px' }} />
                            MENU
                        </button>

                    </div>

                    {/* Formulário de alteração de senha */}
                    {showChangePasswordForm && (
                        <div className={styles.changePasswordForm}>
                            <h2>
                                <FaKey style={{ marginRight: '10px' }} />
                                Alterar Senha
                            </h2>
                            {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}
                            {passwordSuccess && <div className={styles.successMessage}>{passwordSuccess}</div>}
                            <form onSubmit={handleChangePassword}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="password">Nova Senha</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="confirmPassword">Confirmar Senha</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Botões lado a lado */}
                                <div className={styles.buttonGroup}>
                                    <button type="submit" className="btn">
                                        <FaKey style={{ marginRight: '10px' }} />
                                        Alterar Senha
                                    </button>
                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={() => setShowChangePasswordForm(false)}
                                    >
                                        <FaX style={{ marginRight: '10px' }} />
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
