import React from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/ErrorPage.module.css";
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
                return <Link to="/menu" className="btn btn-menu">Ir para o Menu</Link>;
            case "401":
                return <Link to="/" className="btn btn-menu">Fazer Login</Link>;
            case "403":
                return <Link to="/menu" className="btn btn-menu">Ir para o Menu</Link>;
            case "404":
                return <Link to="/menu" className="btn btn-menu">Voltar para o Menu</Link>;
            case "422":
                return <Link to="/menu" className="btn btn-menu">Voltar para o Menu</Link>;
            case "500":
                return <Link to="#" onClick={() => window.location.reload()} className="btn btn-menu">Tentar Novamente</Link>;
            default:
                return <Link to="/" className="btn btn-menu">Fazer Login</Link>;
        }
    };

    return (
        <div>
            <Header userName={userName} role={role} handleLogout={handleLogout} />
            <div className="error-container">
                <h2>Erro {status || "Desconhecido"}</h2>
                <p>{errorMessage}</p>
                {renderLink()}
            </div>
        </div>

    );
};

export default ErrorPage;
