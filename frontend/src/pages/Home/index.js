import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  Container,
  UserName,
  AlbumsContainer,
  AlbumList,
  AlbumItem,
  AlbumTitle,
  AlbumDescription,
  Button,
  CreateAlbumButton,
  LogoutButton,
} from "./styles";

const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = JSON.parse(atob(token.split('.')[1]));
      console.log(userData);
      setUser(userData);

      axios.get("http://localhost:5000/auth/albuns", {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(response => {
        if (Array.isArray(response.data)) {
          setAlbums(response.data);
        } else {
          console.error("Formato de resposta inválido para álbuns");
        }
      })
      .catch(error => {
        console.error("Erro ao buscar álbuns", error);
      });

      axios.get("http://localhost:5000/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar dados do usuário", error);
      });
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Container>
      {user && <UserName>Olá, {user.nome}!</UserName>}

      <LogoutButton onClick={() => [signout(), navigate("/")]}>
        Sair
      </LogoutButton>

      <AlbumsContainer>
        <AlbumList>
          {albums.length > 0 ? (
            albums.map((album) => (
              <AlbumItem key={album._id}>
                <AlbumTitle>{album.titulo}</AlbumTitle>
                <AlbumDescription>{album.descricao}</AlbumDescription>
                <Button onClick={() => navigate(`/album/${album._id}`)}>
                  Ver Álbum
                </Button>
              </AlbumItem>
            ))
          ) : (
            <p>Você ainda não tem álbuns.</p>
          )}
        </AlbumList>

        <CreateAlbumButton onClick={() => navigate("/criar-album")}>
          Criar Álbum
        </CreateAlbumButton>
      </AlbumsContainer>
    </Container>
  );
};

export default Home;