import { useState, useEffect } from "react";
import axios from "axios";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); 
    }
  }, []);  

  const signup = async (nome, email, senha) => {
    try {
      console.log("Enviando dados para cadastro:", { nome, email, senha });
      const response = await axios.post("http://localhost:5000/auth/signup", {
        nome,
        email,
        senha,
      });
      console.log("Resposta do backend:", response.data);
      
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);

      return response.data; 
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);


      return { error: error.response?.data?.message || "Erro no servidor" };
    }
  };

  const signin = async (email, senha) => {
    try {
      console.log("Enviando dados para login:", { email, senha });
      const response = await axios.post("http://localhost:5000/auth/signin", {
        email,
        senha,
      });
      console.log("Resposta do backend:", response.data);
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true); 

      return response.data;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return { error: error.response?.data?.message || "Erro no servidor" };
    }
  };

  const signout = () => {
    localStorage.removeItem("token");  
    setIsAuthenticated(false);         
  };

  return {
    signup,
    signin,
    signout,
    isAuthenticated,
  };
};

export default useAuth;
