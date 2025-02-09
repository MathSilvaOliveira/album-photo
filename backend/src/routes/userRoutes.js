const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.get("/user", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-senha"); 
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.json(user);
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ message: "Erro no servidor" });
    }
});

module.exports = router;
