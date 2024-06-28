import { expect } from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import varConfig from '../src/config/envVarConfig.js';

const requester = supertest(`http://localhost:${varConfig.port}`);
mongoose.connect(varConfig.string_con);

// describe('Test Products', () => {
//   it('Crear un producto', async () => {
//     //Given
//     const newProd = {
//       title: 'PES 20',
//       desc: 'Juego de fulbo',
//       code: 'AA11BB',
//       price: 60000,
//       status: true,
//       stock: 20,
//       category: 'Deporte',
//       thumbnails: './',
//     };
//     //Then
//     const { statusCode } = await requester
//       .post('/api/products/addProd')
//       .send(newProd);
//     //Assert
//     expect(statusCode).is.eqls(201);
//   });
//   it('Traer los productos', async () => {
//     //Then
//     const { statusCode, _body } = await requester.get('/api/products');
//     //Assert
//     expect(statusCode).is.eqls(200);
//     expect(_body.data.totalDocs).to.be.greaterThan(0);
//   });
//   after(function () {
//     mongoose.connection.collections.products.drop();
//   });
// });

// describe('Test Carts', () => {
//   it('Crear un carrito', async () => {
//     //Then
//     const { statusCode } = await requester.post('/api/cart/newCart');
//     //Assert
//     expect(statusCode).is.eqls(200);
//   });

//   afterEach(function () {
//     mongoose.connection.collections.carts.drop();
//   });
// });

// describe('Test session', () => {
//   it('Registrarse', async () => {
//     //Given
//     const { _body } = await requester.post('/api/cart/newCart');
//     const newUser = {
//       email: 'prueba0@gmail.com',
//       password: '123',
//       name: 'Prueba',
//       lastname: '0',
//       cart: _body.data._id,
//     };
//     //Then
//     const { status } = await requester.post('/api/auth/register').send(newUser);

//     //Assert
//     expect(_body.data._id).to.exist;
//     expect(status).is.eqls(200);
//   });
// });

// describe('Test GET users', () => {
//   it('Obtener todos los usuarios', async () => {
//     //Then
//     const { status } = await requester.get('/api/users/');

//     //Assert
//     expect(status).is.eqls(200);
//   });
// });

// describe('Test DELETE User', () => {
//   it('Elimina un usuario por su email', async () => {
//     //Given
//     const email = 'prueba0@gmail.com';
//     //Then
//     const { status } = await requester
//       .delete('/api/users/')
//       .send({ email: email });
//     //Assert
//     expect(status).is.eqls(204);
//   });
// });

describe('Test PUT rol User', () => {
  it('Cambia el rol de un usuario', async () => {
    //Given
    const user = {
      email: 'prueba0@gmail.com',
      rol: 'premium',
    };
    //Then
    const { statusCode } = await requester
      .put('/api/users/change_rol')
      .send(user);
    //Asser
    expect(statusCode).is.eqls(200);
  });
});
