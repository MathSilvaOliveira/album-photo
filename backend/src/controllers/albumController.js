const multer = require('multer');
const Album = require('../models/Album');

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

const createAlbum = async (req, res) => {
    try {
        const { titulo, descricao } = req.body;
        const imagens = req.files;

        if (!titulo || !descricao || !imagens || imagens.length === 0) {
            return res.status(400).json({ error: 'Título, descrição e ao menos uma imagem são obrigatórios' });
        }

        const fotos = imagens.map(img => ({
            filename: img.filename,
            titulo: img.originalname,
            descricao: "Foto carregada",
            dataDeAquisicao: new Date(),
            tamanho: img.size,
            corPredominante: "Desconhecido"
        }));

        const novoAlbum = new Album({
            titulo,
            descricao,
            fotos,
            usuario: req.user.id,
        });

        await novoAlbum.save();

        res.status(201).json({ message: 'Álbum criado com sucesso', album: novoAlbum });
    } catch (error) {
        console.error('Erro ao criar o álbum', error);
        res.status(500).json({ error: 'Erro ao criar álbum, tente novamente' });
    }
};

module.exports = { createAlbum, upload };