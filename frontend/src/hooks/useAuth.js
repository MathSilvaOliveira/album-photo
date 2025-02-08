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
      return error.response?.data?.message || "Erro no servidor";
    }
  };

  const signout = () => {
    localStorage.removeItem("token");  
    setIsAuthenticated(false);         
  };

  return {
    signin,
    signout,
    isAuthenticated,
  };
};

export default useAuth;
