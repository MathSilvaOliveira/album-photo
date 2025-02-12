import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  gap: 20px;
  padding: 20px;
  background-color: #f9f9f9; /* Fundo mais suave */
`;

export const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
`;

export const PhotoFrame = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  border: 10px solid #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  overflow: hidden;
  border-radius: 8px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const PhotoImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  cursor: pointer;
`;

export const PhotoTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  text-align: center;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${PhotoFrame}:hover & {
    opacity: 1;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

export const Button = styled.button`
  background-color: ${(props) => (props.active ? "#007BFF" : "#ccc")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#005bb5" : "#bbb")};
  }
`;

export const DeleteButton = styled.button`
  background-color: red;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkred;
  }
`;

export const AddPhotoButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #218838;
  }
`;

export const UploadFormContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
`;

export const BackButton = styled.button`
  position: fixed; /* Fixo para não interferir no scroll */
  top: 20px;
  left: 20px;
  background-color: #6c757d; /* Cor cinza */
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
  z-index: 1000; /* Garante que o botão fique acima de outros elementos */

  &:hover {
    background-color: #5a6268; /* Cor cinza mais escura no hover */
  }

  @media (max-width: 768px) {
    top: 10px;
    left: 10px;
    padding: 8px 12px;
    font-size: 12px;
  }
`;