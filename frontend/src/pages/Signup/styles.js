import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    height: 100vh;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;  
    overflow: hidden; 
`;

export const Content = styled.div`
    gap: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;  
    width: 100%;
    box-shadow: 0 1px 2px #0003;
    background-color: white;
    max-width: 400px; 
    padding: 30px;
    border-radius: 5px;
    box-sizing: border-box;
    @media (max-width: 500px) {
        max-width: 90%;
        padding: 20px;
    }
`;

export const Label = styled.label`
    font-size: 18px;
    font-weight: 600;
    color: #676767;
    margin-bottom: 5px;
`;

export const LabelSignup = styled.label`
    font-size: 16px;
    color: #676767;
    text-align: center;
`;

export const LabelError = styled.label`
    font-size: 14px;
    color: red;
    margin-top: 5px;
`;

export const Strong = styled.strong`
    cursor: pointer;
    a {
        text-decoration: none;
        color: #676767;
    }
`;

export const Input = styled.input`
    width: 100%; 
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 15px;
    box-sizing: border-box;
    &:focus {
        outline: none;
        border-color: #007bff;
    }
`;

export const Button = styled.button`
    width: 100%; 
    padding: 12px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;