const { productManager } = require('../db/factory');
const ProductDTO = require('../db/dto/product.dto');
const CustomError = require('../services/errors/error.custom');
const EErrors = require('../services/errors/error.enum');
const {
  generateUserErrorInfo,
} = require('../services/errors/messages/error.messages');

const pm = new productManager();

const getProducts = async (req, res) => {
  try {
    let { category, limit, sort, page } = req.query;
    let querys = {
      category: category,
      limit: limit,
      sort: parseInt(sort),
      page: page,
    };
    let response = await pm.getProducts(querys);
    if (response != false && response.docs.length > 0) {
      res.status(200).send({
        msg: 'Productos obtenidos con exito',
        data: response,
      });
    } else if (response.docs.length < 1) {
      res
        .status(404)
        .send({ msg: 'No hay productos para los criterios seleccionados' });
    } else {
      res.status(500).send({
        msg: 'Error inesperado',
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const addProd = async (req, res) => {
  let data = req.body;
  const { id, title, desc, price, category } = data;
  if (!id || !title || !desc || !price || !category) {
    CustomError.createError({
      name: 'Error al crear el usuario',
      cause: generateUserErrorInfo({ id, title, desc, price, category }),
      message: 'Campos vacios o tipo de dato invalido',
      code: EErrors.INVALID_TYPES_ERROR,
    });
  }
  data = new ProductDTO(data);
  const response = await pm.addProduct(data);
  if (response)
    res.status(201).send({ msg: 'producto creado con éxito', data: true });
  else res.status(500).send({ msg: 'error al crear el producto', data: true });
};

const delProd = async (req, res) => {
  try {
    const { code } = req.body;

    const response = await pm.delProduct(code);
    if (response)
      res.status(200).send({ msg: 'producto eliminado con éxito', data: true });
    else
      res
        .status(500)
        .send({ msg: 'error al eliminar el producto', data: false });
  } catch (error) {
    console.error();
  }
};

module.exports = { getProducts, addProd, delProd };
