import React from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";

const errorMessages = {
    400: "Requisição inválida. Verifique os dados e tente novamente.",
    401: "Não autorizado. Faça login para acessar esta página.",
    403: "Acesso negado. Você não tem permissão para visualizar este conteúdo.",
    404: "Página não encontrada. O recurso solicitado não existe.",
    422: "Erro ao processar solicitação. Tente novamente.",
    500: "Erro interno do servidor. Tente novamente mais tarde.",
    default: "Erro na solicitação. Tente novamente.",
};

const ErrorPage = ({ token, userName, role, handleLogout }) => {
    const { status } = useParams();
    const errorMessage = errorMessages[status] || errorMessages.default;

    const renderLink = () => {
        switch (status) {
            case "400":
                return <Link to="/menu" className="btn-menu">Ir para o Menu</Link>;
            case "401":
                return <Link to="/" className="btn-menu">Fazer Login</Link>;
            case "403":
                return <Link to="/menu" className="btn-menu">Ir para o Menu</Link>;
            case "404":
                return <Link to="/menu" className="btn-menu">Voltar para o Menu</Link>;
            case "422":
                return <Link to="/menu" className="btn-menu">Voltar para o Menu</Link>;
            case "500":
                return <Link to="#" onClick={() => window.location.reload()} className="btn-try-again">Tentar Novamente</Link>;
            default:
                return <Link to="/" className="btn-menu">Fazer Login</Link>;
        }
    };

    return (
        <div>
            <Header userName={userName} role={role} handleLogout={handleLogout} />
            <div className="error-container" style={styles.errorContainer}>
                <h2 style={styles.errorTitle}>Erro {status || "Desconhecido"}</h2>
                <p style={styles.errorMessage}>{errorMessage}</p>
                {renderLink()}
            </div>
        </div>
    );
};

const styles = {
    errorContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "auto",
        minHeight: "250px",
        backgroundColor: "#fff",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "500px",
        margin: "0 auto",
        textAlign: "center",
        marginTop: "100px",
    },
    errorTitle: {
        fontSize: "36px",
        color: "#dc3545",
        marginBottom: "15px",
        fontWeight: "bold",
    },
    errorMessage: {
        fontSize: "16px",
        color: "#333",
        lineHeight: "1.4",
        marginBottom: "20px",
    },
    errorButton: {
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "10px 20px",
        fontSize: "16px",
        fontWeight: "bold",
        textDecoration: "none",
        borderRadius: "5px",
        transition: "background-color 0.3s, transform 0.3s",
        marginTop: "10px",
        display: "inline-block",
    },
    errorButtonHover: {
        backgroundColor: "#0056b3",
        transform: "translateY(-2px)",
    },
    errorButtonTryAgain: {
        backgroundColor: "#28a745",
        color: "#fff",
        padding: "10px 20px",
        fontSize: "16px",
        fontWeight: "bold",
        textDecoration: "none",
        borderRadius: "5px",
        transition: "background-color 0.3s, transform 0.3s",
        marginTop: "10px",
        display: "inline-block",
    },
    errorButtonTryAgainHover: {
        backgroundColor: "#218838",
        transform: "translateY(-2px)",
    },
};

export default ErrorPage;
