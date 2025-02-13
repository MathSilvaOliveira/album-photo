const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');
const Album = require('../src/models/Album');
const path = require('path');
const fs = require('fs');

// Simula o middleware de autenticação
jest.mock('../src/middleware/authMiddleware', () => {
    return (req, res, next) => {
        const mongoose = require('mongoose');
        const mockObjectId = new mongoose.Types.ObjectId();
        req.user = { id: mockObjectId }; // Simula um usuário autenticado
        next();
      };
    });
  
// Dados de teste
const mockAlbum = {
  titulo: "Álbum de Teste",
  descricao: "Descrição do Álbum de Teste",
  fotos: [
    {
      filename: "foto1.jpg",
      titulo: "Foto 1",
      descricao: "Descrição da Foto 1",
      dataDeAquisicao: new Date(),
      tamanho: 1024,
      corPredominante: "Azul",
    },
  ],
};

describe('Testes para o controlador de álbuns', () => {
  beforeAll(async () => {
    // Conecta ao banco de dados de teste apenas se não houver uma conexão ativa
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect('mongodb://localhost:27017/testdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });

  afterAll(async () => {
    // Limpa o banco de dados e fecha a conexão
    await Album.deleteMany({});
    await mongoose.connection.close();
  });

  it('Deve criar um novo álbum', async () => {
    // Verifique se o arquivo existe antes de enviar a requisição
    const imagePath = path.resolve(__dirname, '../uploads/teste.jpg');
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Arquivo não encontrado: ${imagePath}`);
    }

    const response = await request(app)
      .post('/auth/albuns')
      .field('titulo', mockAlbum.titulo)
      .field('descricao', mockAlbum.descricao)
      .field('fotosInfo', JSON.stringify(mockAlbum.fotos))
      .attach('imagens', imagePath); // Anexa uma imagem de teste

    console.log('Response:', response.body);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Álbum criado com sucesso');
    expect(response.body.album).toHaveProperty('titulo', mockAlbum.titulo);
  });

  it('Deve retornar erro ao criar álbum sem título', async () => {
    const imagePath = path.resolve(__dirname, '../uploads/teste.jpg');
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Arquivo não encontrado: ${imagePath}`);
    }

    const response = await request(app)
      .post('/auth/albuns')
      .field('descricao', mockAlbum.descricao)
      .attach('imagens', imagePath); // Anexa uma imagem de teste

    console.log('Response:', response.body);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Título, descrição e ao menos uma imagem são obrigatórios');
  });
});