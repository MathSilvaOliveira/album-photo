const multer = require('multer');
const Album = require('../models/Album');
const authMiddleware = require('../middleware/authMiddleware');

// Configuração do multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Função para criar um álbum
async function createAlbum(req, res) {
  try {
    const { titulo, descricao } = req.body;
    const imagens = req.files;

    if (!titulo || !descricao || !imagens || imagens.length === 0) {
      return res.status(400).json({ error: 'Título, descrição e ao menos uma imagem são obrigatórios' });
    }

    const novoAlbum = new Album({
      titulo,
      descricao,
      imagens: imagens.map(img => img.filename),
      usuario: req.user.id,
    });

    await novoAlbum.save();

    res.status(201).json({ message: 'Álbum criado com sucesso', album: novoAlbum });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar álbum, tente novamente' });
  }
}

// Exportando a função de criação e o upload
module.exports = { createAlbum, upload };
