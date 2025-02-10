const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    }

    try {
        console.log("JWT_SECRET ao gerar token:", process.env.JWT_SECRET);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Adiciona os dados do usuário ao request

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Usuário não encontrado no token." });
        }
        
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido." });
    }
};

module.exports = authMiddleware;
