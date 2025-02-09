const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");  

require("dotenv").config();
console.log("JWT_SECRET no servidor:", process.env.JWT_SECRET);
const app = express();

app.use(express.json());
app.use(cors());


const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);
app.use("/auth", userRoutes);  

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}).catch(err => console.error("Erro ao conectar ao banco de dados:", err));
