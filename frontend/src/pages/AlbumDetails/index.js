import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import UploadFotos from "./UploadFotos";
import Modal from "../../components/Modal/index"; // Importando o componente Modal

const AlbumDetail = () => {
    const { albumId } = useParams();
    const navigate = useNavigate();
    const [album, setAlbum] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState("miniatura");
    const [selectedPhoto, setSelectedPhoto] = useState(null); // Adicionando estado para a foto selecionada

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

    const handleImageClick = (foto) => {
        setSelectedPhoto(foto);
    };

    const closeModal = () => {
        setSelectedPhoto(null);
    };

    if (loading) return <p>Carregando...</p>;
    if (!album) return <p>Álbum não encontrado.</p>;

    console.log("Estado do álbum:", album);

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
            <h1 style={{ textAlign: "left" }}>{album.titulo}</h1>
            <p style={{ textAlign: "left", color: "#555" }}>{album.descricao}</p>

            <div>
                <button 
                    onClick={() => setViewMode("miniatura")}
                    style={{
                        backgroundColor: viewMode === "miniatura" ? "#007BFF" : "#ccc",
                        color: viewMode === "miniatura" ? "#fff" : "#000",
                        padding: "10px 15px",
                        margin: "5px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    Miniatura
                </button>
                <button 
                    onClick={() => setViewMode("tabela")}
                    style={{
                        backgroundColor: viewMode === "tabela" ? "#007BFF" : "#ccc",
                        color: viewMode === "tabela" ? "#fff" : "#000",
                        padding: "10px 15px",
                        margin: "5px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    Tabela
                </button>
            </div>

            {viewMode === "miniatura" ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginTop: "20px" }}>
                    {album.fotos && album.fotos.length > 0 ? (
                        album.fotos.map((foto, index) => (
                            <div key={index} style={{ textAlign: "center" }}>
                                {console.log(`Renderizando tag <img> para: http://localhost:5000/uploads/${foto.filename}`)}
                                <img
                                    src={`http://localhost:5000/uploads/${foto.filename}`}
                                    alt={foto.titulo}
                                    style={{ width: "100%", height: "auto", borderRadius: "8px", cursor: "pointer" }}
                                    onClick={() => handleImageClick(foto)} // Adicionando evento de clique
                                />
                            </div>
                        ))
                    ) : (
                        <p>Nenhuma imagem disponível.</p>
                    )}
                </div>
            ) : (
                <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Título</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Descrição</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Data de Aquisição</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Tamanho</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Cor Predominante</th>
                        </tr>
                    </thead>
                    <tbody>
                        {album.fotos && album.fotos.length > 0 ? (
                            album.fotos.map((foto, index) => (
                                <tr key={index} onClick={() => handleImageClick(foto)} style={{ cursor: "pointer" }}>
                                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{foto.titulo}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{foto.descricao}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{new Date(foto.dataDeAquisicao).toLocaleDateString()}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{foto.tamanho} KB</td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{foto.corPredominante}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Nenhuma imagem disponível.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

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

            <Modal isOpen={!!selectedPhoto} onClose={closeModal}>
                {selectedPhoto && (
                    <div>
                        <h3>{selectedPhoto.titulo}</h3>
                        <p>{selectedPhoto.descricao}</p>
                        <img
                            src={`http://localhost:5000/uploads/${selectedPhoto.filename}`}
                            alt={selectedPhoto.titulo}
                            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default AlbumDetail;
