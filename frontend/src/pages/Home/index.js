import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import * as C from "./styles";
import useAuth from "../../hooks/useAuth";


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
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, },
            })
            .then(response => {
                    // Verificando se a resposta é um array de álbuns
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
        <C.Container>
            {user && <C.UserName>Olá, {user.nome}!</C.UserName>}
            
            <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>Sair</Button>
            
            <C.AlbumsContainer>
                <C.AlbumList>
                    {albums.length > 0 ? (
                        albums.map((album) => (
                            <C.AlbumItem key={album._id}>
                                <C.AlbumTitle>{album.titulo}</C.AlbumTitle>
                                <C.AlbumDescription>{album.descricao}</C.AlbumDescription>
                                <Button Text="Ver Álbum" onClick={() => navigate(`/album/${album._id}`)} />
                            </C.AlbumItem>
                        ))
                    ) : (
                        <p>Você ainda não tem álbuns.</p>
                    )}
                </C.AlbumList>
                <Button Text="Criar Álbum" onClick={() => navigate("/criar-album")} />
            </C.AlbumsContainer>
        </C.Container>
    );
};

export default Home;