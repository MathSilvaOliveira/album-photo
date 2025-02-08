const express = require("express");
const { registerUser, loginUser, getUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);

// Rota para obter os dados do usuário
router.get("/user", authMiddleware, getUser);

module.exports = router;
