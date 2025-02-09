const express = require("express");
const { registerUser, loginUser, getUser } = require("../controllers/authController");
const { createAlbum, upload } = require('../controllers/albumController');
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.post('/albuns', upload.array('imagens'), createAlbum); 

router.get("/user", authMiddleware, getUser);

module.exports = router;
