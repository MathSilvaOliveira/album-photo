import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const AlbumDetail = () => {
    const { albumId } = useParams();  // Pega o id do álbum pela URL
    console.log(albumId);
    const [album, setAlbum] = useState(null);  // Inicializa o álbum como null
    const [loading, setLoading] = useState(true);  // Estado para indicar o carregamento
  
    useEffect(() => {
      const fetchAlbumDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/auth/album/${albumId}`);
          setAlbum(response.data);  // Define os dados do álbum
          setLoading(false);  // Muda o estado de carregamento
        } catch (error) {
          console.error("Erro ao buscar os detalhes do álbum", error);
          setLoading(false);
        }
      };
  
      fetchAlbumDetails();
    }, [albumId]);
  
    if (loading) {
      return <div>Carregando...</div>;  // Exibe uma mensagem enquanto carrega os dados
    }
  
    if (!album) {
      return <div>Álbum não encontrado.</div>;  // Exibe se o álbum não for encontrado
    }
  
    return (
      <div>
        <h1>{album.titulo}</h1>
        <p>{album.descricao}</p>
  
        {/* Verifique se as imagens existem antes de tentar mapear */}
        {album.imagens && album.imagens.length > 0 ? (
          album.imagens.map((imagem) => (
            <img key={imagem.filename} src={`http://localhost:5000/uploads/${imagem.filename}`} alt={imagem.filename} />
          ))
        ) : (
          <p>Não há imagens neste álbum.</p>
        )}
      </div>
    );
  };
  

export default AlbumDetail;
