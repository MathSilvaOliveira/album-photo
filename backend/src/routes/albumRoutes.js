const express = require('express');
const { createAlbum, upload } = require('../controllers/albumController');
const router = express.Router();

// Rota para criar álbum
router.post('/albuns', upload.array('imagens'), createAlbum); // Usando a função createAlbum do controller

module.exports = router;
