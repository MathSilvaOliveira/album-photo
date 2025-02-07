import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Signup = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [emailConf, setEmailConf] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const handleSignup = () => {
        if (!nome || !email || !emailConf || !senha) {
            setError("Preencha todos os campos");
            return;
        }
        if (email !== emailConf) {
            setError("Os e-mails não coincidem");
            return;
        }

        const res = signup(nome, email, senha);

        if (res) {
            setError(res);
            return;
        }

        navigate("/");
    };

    return (
        <C.Container>
            <C.Label>Album-Photo</C.Label>
            <C.Content>
                <Input
                    type="text"
                    placeholder="Digite seu Nome"
                    value={nome}
                    onChange={(e) => [setNome(e.target.value), setError("")]}
                />
                <Input
                    type="email"
                    placeholder="Digite seu E-mail"
                    value={email}
                    onChange={(e) => [setEmail(e.target.value), setError("")]}
                />
                <Input
                    type="email"
                    placeholder="Confirme seu E-mail"
                    value={emailConf}
                    onChange={(e) => [setEmailConf(e.target.value), setError("")]}
                />
                <Input
                    type="password"
                    placeholder="Digite sua Senha"
                    value={senha}
                    onChange={(e) => [setSenha(e.target.value), setError("")]}
                />
                <C.LabelError>{error}</C.LabelError>
                <Button Text="Cadastrar" onClick={handleSignup} />
                <C.LabelSignup>
                    Já tem uma conta?
                    <C.Strong>
                        <Link to="/signin">&nbsp;Faça login</Link>
                    </C.Strong>
                </C.LabelSignup>
            </C.Content>
        </C.Container>
    );
};

export default Signup;
