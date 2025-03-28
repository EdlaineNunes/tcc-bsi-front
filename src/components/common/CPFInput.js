import React, { useState, useEffect } from "react";

const formatCPF = (value) => {
    return value
        .replace(/\D/g, "") // Remove tudo que não for número
        .slice(0, 11) // Garante no máximo 11 dígitos
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

const CPFInput = ({ initialValue = "", onChange }) => {
    const [cpf, setCpf] = useState("");

    useEffect(() => {
        if (initialValue) {
            setCpf(formatCPF(initialValue));
        }
    }, [initialValue]);

    const handleCpfChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, "").slice(0, 11);
        setCpf(formatCPF(rawValue));
        onChange(rawValue); // Envia apenas números para o back-end
    };

    return (
        <input
            type="text"
            value={cpf}
            onChange={handleCpfChange}
            placeholder="000.000.000-00"
            required
        />
    );
};

export default CPFInput;
