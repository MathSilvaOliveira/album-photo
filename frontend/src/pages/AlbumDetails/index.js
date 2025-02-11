// frontend/AlbumDetail/index.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import UploadFotos from "./UploadFotos"; // Importando o novo componente

const AlbumDetail = () => {
    const { albumId } = useParams();
    const navigate = useNavigate();
    const [album, setAlbum] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mova a definição da função `refreshAlbum` aqui
    const refreshAlbum = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/auth/album/${albumId}`);
            setAlbum(response.data);
        } catch (error) {
            console.error("Erro ao buscar os detalhes do álbum", error);
        }
    };

    useEffect(() => {
        const fetchAlbumDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/auth/album/${albumId}`);
                console.log("Dados do album: ", response.data);
                setAlbum(response.data);
            } catch (error) {
                console.error("Erro ao buscar os detalhes do álbum", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbumDetails();
    }, [albumId]);

    const handleDeleteAlbum = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Você precisa estar logado para excluir um álbum.");
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/auth/album/${albumId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Álbum excluído com sucesso!");
            navigate("/home");
        } catch (error) {
            console.error("Erro ao excluir o álbum", error);
            alert(error.response?.data?.message || "Erro ao excluir o álbum");
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (!album) return <p>Álbum não encontrado.</p>;

    console.log("Estado do álbum:", album);

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
            <h1 style={{ textAlign: "left" }}>{album.titulo}</h1>
            <p style={{ textAlign: "left", color: "#555" }}>{album.descricao}</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginTop: "20px" }}>
                {album.fotos && album.fotos.length > 0 ? (
                    album.fotos.map((foto, index) => (
                        <div key={index} style={{ textAlign: "center" }}>
                            {console.log(`Renderizando tag <img> para: http://localhost:5000/uploads/${foto.filename}`)}
                            <img
                                src={`http://localhost:5000/uploads/${foto.filename}`}
                                alt={foto.titulo}
                                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                            />
                        </div>
                    ))
                ) : (
                    <p>Nenhuma imagem disponível.</p>
                )}
            </div>

            {/* Adicionando o novo componente UploadFotos */}
            <UploadFotos albumId={albumId} onFotosAdicionadas={refreshAlbum} />

            <button
                onClick={handleDeleteAlbum}
                style={{
                    marginTop: "20px",
                    backgroundColor: "red",
                    color: "white",
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Excluir Álbum
            </button>
        </div>
    );
};

export default AlbumDetail;
