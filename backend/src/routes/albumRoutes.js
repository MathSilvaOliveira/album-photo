const express = require('express');
const { createAlbum, upload } = require('../controllers/albumController');
const router = express.Router();
const Album = require("../models/Album");
const authMiddleware = require("../middleware/authMiddleware")

// Rota para criar álbum
router.post('/albuns', authMiddleware, upload.array('imagens'), createAlbum); // Usando a função createAlbum do controller

// Rota para buscar os álbuns de um usuário
router.get('/albuns', authMiddleware, async (req, res) => {
    try {
      // Busca os álbuns do usuário logado
      const albuns = await Album.find({ usuario: req.user.id }); // 'usuario' é o ID do usuário logado
      res.status(200).json(albuns);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar álbuns' });
    }
  });

// Rota para buscar um álbum por ID
router.get('/album/:id', async (req, res) => {
  try {
      const album = await Album.findById(req.params.id).populate('usuario');
      if (!album) {
          return res.status(404).json({ error: 'Álbum não encontrado' });
      }
      res.status(200).json(album);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o álbum' });
  }
});

  

module.exports = router;
