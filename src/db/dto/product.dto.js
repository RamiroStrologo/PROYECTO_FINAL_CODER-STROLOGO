class ProductDTO {
  constructor(data) {
    this.title = data.title;
    this.desc = data.desc;
    this.price = data.price;
    this.status = data.status ? true : false;
    this.stock = data.stock;
    this.category = data.category;
    this.thumbnails = './';
    this.users = data.id;
  }
}

module.exports = ProductDTO;
