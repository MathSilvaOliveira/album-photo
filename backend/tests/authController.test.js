const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');
const User = require('../src/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const mockUser = {
  nome: "Usuário Teste",
  email: "teste@exemplo.com",
  senha: "Senha123!",
};


beforeAll(() => {
    process.env.PORT = 5002;  // Definindo uma porta diferente para os testes
  });

describe('Testes para o controlador de autenticação', () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect('mongodb://localhost:27017/testdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it('Deve registrar um novo usuário', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({
        nome: mockUser.nome,
        email: mockUser.email,
        senha: mockUser.senha,
      });

    console.log('Response:', response.body);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Usuário cadastrado com sucesso!');
  });

  it('Deve retornar erro ao registrar usuário com e-mail já cadastrado', async () => {
    await request(app)
      .post('/auth/signup')
      .send({
        nome: mockUser.nome,
        email: mockUser.email,
        senha: mockUser.senha,
      });

    const response = await request(app)
      .post('/auth/signup')
      .send({
        nome: mockUser.nome,
        email: mockUser.email,
        senha: mockUser.senha,
      });

    console.log('Response:', response.body);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'E-mail já cadastrado');
  });

  it('Deve realizar login com sucesso', async () => {
    await request(app)
      .post('/auth/signup')
      .send({
        nome: mockUser.nome,
        email: mockUser.email,
        senha: mockUser.senha,
      });

    const response = await request(app)
      .post('/auth/signin')
      .send({
        email: mockUser.email,
        senha: mockUser.senha,
      });

    console.log('Response:', response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user).toHaveProperty('nome', mockUser.nome);
    expect(response.body.user).toHaveProperty('email', mockUser.email);
  });

  it('Deve retornar erro ao realizar login com e-mail ou senha incorretos', async () => {
    const response = await request(app)
      .post('/auth/signin')
      .send({
        email: mockUser.email,
        senha: 'SenhaErrada123!',
      });

    console.log('Response:', response.body);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'E-mail ou senha incorretos');
  });

  it('Deve retornar erro ao tentar registrar usuário com senha fraca', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({
        nome: "Novo Usuário",
        email: "novo@exemplo.com",
        senha: "12345", 
      });

    console.log('Response:', response.body);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'A senha deve ter pelo menos 8 caracteres, incluindo 1 letra maiúscula, 1 número e 1 caractere especial.');
  });

  it('Deve retornar erro ao tentar realizar login sem enviar todos os campos', async () => {
    const response = await request(app)
      .post('/auth/signin')
      .send({
        email: mockUser.email,
      });

    console.log('Response:', response.body);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Preencha todos os campos');
  });
});
