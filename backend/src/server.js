const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");  
const albumsRoutes = require("./routes/albumRoutes");
const path = require('path');

require("dotenv").config();
console.log("JWT_SECRET no servidor:", process.env.JWT_SECRET);
const app = express();

app.use(express.json());
app.use(cors());


const authRoutes = require("./routes/authRoutes");
const uploadsPath = path.join(__dirname, '..', 'uploads');
console.log('Caminho da pasta uploads:', uploadsPath); 
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use("/auth", albumsRoutes);
app.use("/auth", authRoutes);
app.use("/auth", userRoutes);  

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}).catch(err => console.error("Erro ao conectar ao banco de dados:", err));
