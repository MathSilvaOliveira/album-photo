import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: flex-start; 
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  gap: 20px;
  padding: 20px;
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

export const UserName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
`;

export const AlbumsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  width: 100%;
`;

export const AlbumList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
`;

export const AlbumItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 200px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;

export const AlbumTitle = styled.h4`
  font-size: 1.2rem;
  color: #333;
`;

export const AlbumDescription = styled.p`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 15px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;
