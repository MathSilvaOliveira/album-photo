import React, { useState } from 'react';
import axios from 'axios';

const UploadFotos = ({ albumId, onFotosAdicionadas }) => {
    const [imagens, setImagens] = useState([]);
    const [fotosInfo, setFotosInfo] = useState([]);

    const handleFileChange = (e) => {
        setImagens(e.target.files);
    };

    const handleInputChange = (index, field, value) => {
        const updatedFotosInfo = [...fotosInfo];
        updatedFotosInfo[index] = {
            ...updatedFotosInfo[index],
            [field]: value,
        };
        setFotosInfo(updatedFotosInfo);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (let i = 0; i < imagens.length; i++) {
            formData.append('imagens', imagens[i]);
            formData.append(`fotosInfo[${i}][titulo]`, fotosInfo[i]?.titulo || "");
            formData.append(`fotosInfo[${i}][descricao]`, fotosInfo[i]?.descricao || "");
            formData.append(`fotosInfo[${i}][corPredominante]`, fotosInfo[i]?.corPredominante || "desconhecida");
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Você precisa estar logado para fazer upload de fotos.");
                return;
            }

            await axios.post(`http://localhost:5000/auth/album/${albumId}/fotos`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Fotos adicionadas com sucesso!');
            onFotosAdicionadas();
        } catch (error) {
            console.error('Erro ao fazer upload das fotos', error);
            alert(error.response?.data?.message || 'Erro ao fazer upload das fotos');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" multiple onChange={handleFileChange} />
            {Array.from(imagens).map((imagem, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder="Título"
                        value={fotosInfo[index]?.titulo || ""}
                        onChange={(e) => handleInputChange(index, 'titulo', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Descrição"
                        value={fotosInfo[index]?.descricao || ""}
                        onChange={(e) => handleInputChange(index, 'descricao', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Cor Predominante"
                        value={fotosInfo[index]?.corPredominante || ""}
                        onChange={(e) => handleInputChange(index, 'corPredominante', e.target.value)}
                    />
                </div>
            ))}
            <button type="submit">Adicionar Fotos</button>
        </form>
    );
};

export default UploadFotos;
