const { fakerES: faker } = require('@faker-js/faker');
const { createCode } = require('./bcrypts');

const generateProducts = () => {
  const category = ['Acción', 'Deporte', 'RPG', 'Carreras'];
  const randomCat = category[Math.floor(Math.random() * category.length)];
  return {
    title: faker.commerce.productName(),
    desc: randomCat,
    code: createCode(3),
    price: faker.commerce.price(),
    status: true,
    stock: 5,
    category: randomCat,
    thumbnails: './',
  };
};

module.exports = { generateProducts };
