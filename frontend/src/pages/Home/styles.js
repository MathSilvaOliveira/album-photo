import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 20px;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
`;

export const UserName = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

export const AlbumsContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const AlbumList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

export const AlbumItem = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const AlbumTitle = styled.h2`
  font-size: 18px;
  color: #007bff;
  margin-bottom: 10px;
`;

export const AlbumDescription = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 15px;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005bb5;
  }
`;

export const CreateAlbumButton = styled(Button)`
  background-color: #28a745;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  display: block;

  &:hover {
    background-color: #218838;
  }
`;

export const LogoutButton = styled(Button)`
  background-color: #dc3545;
  margin-bottom: 20px;

  &:hover {
    background-color: #c82333;
  }
`;