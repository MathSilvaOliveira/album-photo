import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import UploadFotos from "./UploadFotos";
import Modal from "../../components/Modal/index"; // Importando o componente Modal
import { Container, PhotoGrid, PhotoFrame, PhotoImage, PhotoTitle, Button, ButtonContainer, DeleteButton , UploadFormContainer, AddPhotoButton, BackButton} from "./styles";

const AlbumDetail = () => {
    const { albumId } = useParams();
    const navigate = useNavigate();
    const [album, setAlbum] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState("miniatura");
    const [selectedPhoto, setSelectedPhoto] = useState(null); // Adicionando estado para a foto selecionada
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [showUploadForm, setShowUploadForm] = useState(false);

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

    const handlePhotoSelection = (foto) => {
        setSelectedPhotos((prevSelected) => {
            if (prevSelected.includes(foto._id)) {
                return prevSelected.filter(id => id !== foto._id);
            } else {
                return [...prevSelected, foto._id];
            }
        });
    };

    const handleDeletePhotos = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Você precisa estar logado para excluir fotos.");
            return;
        }

        try {
            for (const fotoId of selectedPhotos) {
                await axios.delete(`http://localhost:5000/auth/album/${albumId}/fotos/${fotoId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            setSelectedPhotos([]);
            refreshAlbum();
            alert("Fotos excluídas com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir as fotos", error);
            alert(error.response?.data?.message || "Erro ao excluir as fotos");
        }
    };

    const closeModal = () => {
        setSelectedPhoto(null);
    };

    if (loading) return <p>Carregando...</p>;
    if (!album) return <p>Álbum não encontrado.</p>;

    console.log("Estado do álbum:", album);

    return (
        <Container>
            <BackButton onClick={() => navigate("/home")}>Voltar</BackButton>
             <h1 style={{ textAlign: "left", color: "#333" }}>{album.titulo}</h1>
             <p style={{ textAlign: "left", color: "#555" }}>{album.descricao}</p>
  
            <ButtonContainer>
              <Button
                active={viewMode === "miniatura"}
                onClick={() => setViewMode("miniatura")}
              >
                Miniatura
              </Button>
              <Button
                active={viewMode === "tabela"}
                onClick={() => setViewMode("tabela")}
              >
                Tabela
              </Button>
            </ButtonContainer>
        
            {viewMode === "miniatura" ? (
              <PhotoGrid>
                {album.fotos && album.fotos.length > 0 ? (
                  album.fotos.map((foto, index) => (
                    <PhotoFrame key={index} onClick={() => handleImageClick(foto)}>
                      <PhotoImage
                        src={`http://localhost:5000/uploads/${foto.filename}`}
                        alt={foto.titulo}
                      />
                      <PhotoTitle>{foto.titulo}</PhotoTitle>
                    </PhotoFrame>
                  ))
                ) : (
                  <p>Nenhuma imagem disponível.</p>
                )}
              </PhotoGrid>
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
    
            {!showUploadForm && (
              <AddPhotoButton onClick={() => setShowUploadForm(true)}>
                Adicionar Fotos
              </AddPhotoButton>
            )}
    
            {showUploadForm && (
              <UploadFormContainer>
                <UploadFotos albumId={albumId} onFotosAdicionadas={refreshAlbum} />
                <Button onClick={() => setShowUploadForm(false)}>Cancelar</Button>
              </UploadFormContainer>
            )}
    
            {selectedPhotos.length > 0 && (
              <DeleteButton onClick={handleDeletePhotos}>
                Excluir Fotos Selecionadas
              </DeleteButton>
            )}
    
            <DeleteButton onClick={handleDeleteAlbum}>
              Excluir Álbum
            </DeleteButton>

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
                        <DeleteButton
                            onClick={async () => {
                                const token = localStorage.getItem("token");
                                if (!token) {
                                    alert("Você precisa estar logado para excluir uma foto.");
                                    return;
                                }

                                try {
                                    await axios.delete(`http://localhost:5000/auth/album/${albumId}/fotos/${selectedPhoto._id}`, {
                                        headers: { Authorization: `Bearer ${token}` },
                                    });
                                    alert("Foto excluída com sucesso!");
                                    refreshAlbum();
                                    closeModal();
                                } catch (error) {
                                    console.error("Erro ao excluir a foto", error);
                                    alert(error.response?.data?.message || "Erro ao excluir a foto");
                                }
                            }}
                        >
                            Excluir Foto
                        </DeleteButton>
                    </div>
                )}
            </Modal>
        </Container>
    );
};

export default AlbumDetail;

