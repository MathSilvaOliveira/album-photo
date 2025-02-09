import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import * as C from "./styles";

const CriarAlbum = () => {
    const navigate = useNavigate();
    
    // Estados para armazenar os dados do formulário
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [imagens, setImagens] = useState([]);

    // Função para capturar as imagens selecionadas
    const handleFileChange = (e) => {
        setImagens(e.target.files);
    };

    // Função para enviar os dados ao backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!titulo || !descricao || imagens.length === 0) {
            alert("Preencha todos os campos e adicione pelo menos uma imagem.");
            return;
        }

        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("descricao", descricao);

        // Adiciona as imagens ao FormData
        for (let i = 0; i < imagens.length; i++) {
            formData.append("imagens", imagens[i]);
        }

        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:5000/auth/albuns", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Álbum criado com sucesso!");
            navigate("/home");
        } catch (error) {
            console.error("Erro ao criar álbum", error);
            alert("Erro ao criar álbum, tente novamente.");
        }
    };

    return (
        <C.Container>
            <C.Form onSubmit={handleSubmit}>
                <C.Label>Título do Álbum</C.Label>
                <C.Input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />

                <C.Label>Descrição</C.Label>
                <C.TextArea
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                />

                <C.Label>Adicionar Fotos</C.Label>
                <C.Input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                />

                <Button Text="Criar Álbum" Type="submit" />
                <Button Text="Cancelar" onClick={() => navigate("/home")} />
            </C.Form>
        </C.Container>
    );
};

export default CriarAlbum;
