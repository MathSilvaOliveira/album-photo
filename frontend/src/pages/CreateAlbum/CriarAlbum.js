import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Label,
  Input,
  TextArea,
  ButtonContainer,
  PrimaryButton,
  SecondaryButton,
} from "./styles";

const CriarAlbum = () => {
  const navigate = useNavigate();


  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagens, setImagens] = useState([]);
  const [fotosInfo, setFotosInfo] = useState([]);

  const handleFileChange = (e) => {
    setImagens(e.target.files);
    setFotosInfo(Array.from(e.target.files).map(() => ({
      titulo: "",
      descricao: "",
      corPredominante: "",
    })));
  };


  const handleFotoInfoChange = (index, field, value) => {
    const updatedFotosInfo = [...fotosInfo];
    updatedFotosInfo[index] = { ...updatedFotosInfo[index], [field]: value };
    setFotosInfo(updatedFotosInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo || !descricao || imagens.length === 0) {
      alert("Preencha todos os campos e adicione pelo menos uma imagem.");
      return;
    }

    if (fotosInfo.length !== imagens.length) {
      alert("O número de informações de fotos não corresponde ao número de imagens.");
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);


    for (let i = 0; i < imagens.length; i++) {
      formData.append("imagens", imagens[i]);
    }

    formData.append("fotosInfo", JSON.stringify(fotosInfo));

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
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label>Título do Álbum</Label>
        <Input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Digite o título do álbum"
          required
        />

        <Label>Descrição</Label>
        <TextArea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Digite a descrição do álbum"
          required
        />

        <Label>Adicionar Fotos</Label>
        <Input
          type="file"
          multiple
          onChange={handleFileChange}
          accept="image/*"
          required
        />

        {/* Renderiza campos de informações para cada foto */}
        {Array.from(imagens).map((_, index) => (
          <div key={index}>
            <Label>Informações da Foto {index + 1}</Label>
            <Input
              type="text"
              placeholder="Título da Foto"
              onChange={(e) => handleFotoInfoChange(index, "titulo", e.target.value)}
            />
            <Input
              type="text"
              placeholder="Descrição da Foto"
              onChange={(e) => handleFotoInfoChange(index, "descricao", e.target.value)}
            />
            <Input
              type="text"
              placeholder="Cor Predominante"
              onChange={(e) => handleFotoInfoChange(index, "corPredominante", e.target.value)}
            />
          </div>
        ))}

        <ButtonContainer>
          <SecondaryButton type="button" onClick={() => navigate("/home")}>
            Cancelar
          </SecondaryButton>
          <PrimaryButton type="submit">Criar Álbum</PrimaryButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default CriarAlbum;