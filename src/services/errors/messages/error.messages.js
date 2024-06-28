const generateUserErrorInfo = (data) => {
  return `Una o más propiedades fueron enviadas incompletas o no son válidas.
    Lista de propiedades requeridas:
        -> title: type String, recived: ${typeof data.title} - ${data.title}
        -> desc: type String, recived: ${typeof data.desc} - ${data.desc}
        -> price: type String, recived: ${typeof data.price} - ${data.price}
        -> category: type String, recived: ${typeof data.category} - ${
    data.category
  }
`;
};

module.exports = { generateUserErrorInfo };
