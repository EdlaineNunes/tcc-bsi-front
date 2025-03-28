import React, { useState, useEffect } from "react";

const formatCPF = (value) => {
    return value
        .replace(/\D/g, "")
        .slice(0, 11)
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
        let rawValue = e.target.value.replace(/\D/g, "").slice(0, 11);
        if (rawValue.length === 11) {
            setCpf(formatCPF(rawValue));
            onChange(rawValue);
        } else {
            setCpf(formatCPF(rawValue));
            onChange(rawValue);
        }
    };

    return (
        <input
            type="text"
            value={cpf}
            onChange={handleCpfChange}
            placeholder="000.000.000-00"
            required
            maxLength={14}
            minLength={14}
        />
    );
};

export default CPFInput;
