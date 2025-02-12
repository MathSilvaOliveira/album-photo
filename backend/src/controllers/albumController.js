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
        const { titulo, descricao, fotosInfo } = req.body;
        const imagens = req.files;

        if (!titulo || !descricao || !imagens || imagens.length === 0) {
            return res.status(400).json({ error: 'Título, descrição e ao menos uma imagem são obrigatórios' });
        }

        const fotos = imagens.map((img, index) => ({
            filename: img.filename,
            titulo: fotosInfo[index]?.titulo || img.originalname,
            descricao: fotosInfo[index]?.descricao || "Foto carregada",
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

const addPhotosToAlbum = async (req, res) => {
    try {
        const { id } = req.params;
        const { fotosInfo } = req.body;
        const imagens = req.files;

        if (!imagens || imagens.length === 0) {
            return res.status(400).json({ error: 'Ao menos uma imagem é obrigatória' });
        }

        const fotos = imagens.map((img, index) => ({
            filename: img.filename,
            titulo: fotosInfo[index]?.titulo || img.originalname,
            descricao: fotosInfo[index]?.descricao || "Foto carregada",
            dataDeAquisicao: new Date(),
            tamanho: img.size,
            corPredominante: "Desconhecido"
        }));

        const album = await Album.findById(id);
        if (!album) {
            return res.status(404).json({ error: 'Álbum não encontrado' });
        }

        album.fotos.push(...fotos);
        await album.save();

        res.status(200).json({ message: 'Fotos adicionadas com sucesso', album });
    } catch (error) {
        console.error('Erro ao adicionar fotos ao álbum', error);
        res.status(500).json({ error: 'Erro ao adicionar fotos ao álbum, tente novamente' });
    }
};

const deletePhoto = async (req, res) => {
    try {
        console.log('Rota de exclusão de foto acessada'); // Depuração
        console.log('ID do álbum:', req.params.albumId); // Depuração
        console.log('ID da foto:', req.params.fotoId); // Depuração

        const album = await Album.findById(req.params.albumId);
        if (!album) {
            console.log('Álbum não encontrado'); // Depuração
            return res.status(404).json({ error: 'Álbum não encontrado' });
        }

        const photoIndex = album.fotos.findIndex(foto => foto._id.toString() === req.params.fotoId);
        if (photoIndex === -1) {
            console.log('Foto não encontrada'); // Depuração
            return res.status(404).json({ error: 'Foto não encontrada' });
        }

        album.fotos.splice(photoIndex, 1);
        await album.save();

        console.log('Foto excluída com sucesso'); // Depuração
        res.status(200).json({ message: 'Foto excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir a foto', error);
        res.status(500).json({ error: 'Erro ao excluir a foto' });
    }
};

module.exports = { createAlbum, upload, addPhotosToAlbum, deletePhoto };
