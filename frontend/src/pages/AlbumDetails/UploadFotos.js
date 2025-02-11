// frontend/AlbumDetail/UploadFotos.js

import React, { useState } from 'react';
import axios from 'axios';

const UploadFotos = ({ albumId, onFotosAdicionadas }) => {
    const [fotos, setFotos] = useState([]);

    const handleFileChange = (e) => {
        setFotos(e.target.files);
        handleUpload(e.target.files); // Chama a função de upload automaticamente
    };

    const handleUpload = async (selectedFiles) => {
        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('imagens', selectedFiles[i]);
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5000/auth/album/${albumId}/fotos`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Fotos adicionadas com sucesso!');
            onFotosAdicionadas();
        } catch (error) {
            console.error('Erro ao adicionar fotos', error);
            alert('Erro ao adicionar fotos. Tente novamente.');
        }
    };

    return (
        <div>
            <label
                htmlFor="file-upload"
                style={{
                    display: 'inline-block',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Adicionar Fotos
            </label>
            <input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default UploadFotos;
