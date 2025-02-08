const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    console.log("Recebido no req.body:", req.body); 

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: "Preencha todos os campos" });
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "E-mail já cadastrado" });
        }

        const hashedsenha = await bcrypt.hash(senha, 10);

        console.log("Senha hasheada:", hashedsenha); 

        const user = await User.create({ nome, email, senha: hashedsenha });

        res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        console.error("Erro no servidor:", error); 
        res.status(500).json({ message: "Erro no servidor" });
    }
};

const loginUser = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: "Preencha todos os campos" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "E-mail ou senha incorretos" });
        }

        const isPasswordCorrect = await bcrypt.compare(senha, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "E-mail ou senha incorretos" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({
            token,
            user: {
                nome: user.nome,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Erro no servidor:", error); 
        res.status(500).json({ message: "Erro no servidor" });
    }
};

module.exports = { registerUser, loginUser };
