import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/ErrorPage.module.css"; // Arquivo de estilos

const errorMessages = {
    400: "Requisição inválida. Verifique os dados e tente novamente.",
    401: "Não autorizado. Faça login para acessar esta página.",
    403: "Acesso negado. Você não tem permissão para visualizar este conteúdo.",
    404: "Página não encontrada. O recurso solicitado não existe.",
    500: "Erro interno do servidor. Tente novamente mais tarde.",
    default: "Ocorreu um erro inesperado. Tente novamente.",
};

const ErrorPage = () => {
    const location = useLocation();
    const { status } = location.state || { status: "default" };

    return (
        <div className="error-container">
            <h2>Erro {status}</h2>
            <p>{errorMessages[status] || errorMessages.default}</p>
            <Link to="/menu" className="btn btn-menu">
                Voltar ao Menu
            </Link>
        </div>
    );
};

export default ErrorPage;
