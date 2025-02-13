const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
    console.log("JWT_SECRET ao gerar token:", process.env.JWT_SECRET);

    const { nome, email, senha } = req.body;

    console.log("Recebido no req.body:", req.body);

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: "Preencha todos os campos" });
    }

    // Validação de senha forte (mínimo de 8 caracteres, pelo menos 1 número, 1 letra maiúscula e 1 caractere especial)
    const senhaValida = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!senhaValida.test(senha)) {
        return res.status(400).json({
            message: "A senha deve ter pelo menos 8 caracteres, incluindo 1 letra maiúscula, 1 número e 1 caractere especial."
        });
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

    console.log("Dados recebidos para login:", req.body);  

    if (!email || !senha) {
        return res.status(400).json({ message: "Preencha todos os campos" });
    }

    try {
        const user = await User.findOne({ email });

        console.log("Usuário encontrado:", user);  

        if (!user) {
            return res.status(401).json({ message: "E-mail ou senha incorretos" });
        }

        const isPasswordCorrect = await bcrypt.compare(senha, user.senha);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "E-mail ou senha incorretos" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "60d" });

        console.log("Token gerado:", token);  

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

const getUser = async (req, res) => {
    try {
        // ID do usuário vindo do token JWT
        const user = await User.findById(req.user.id).select("-senha");  // Usamos o id que veio no token

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor" });
    }
};

module.exports = { registerUser, loginUser, getUser };
