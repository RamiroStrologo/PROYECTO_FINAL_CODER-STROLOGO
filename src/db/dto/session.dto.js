class SessionDTO {
  constructor(data) {
    this.email = data.email;
    const usernameParts = data.username.split(' ');
    this.name = usernameParts[0];
    this.lastname = usernameParts[1];
    this.cartId = data.cartId;
    this.role = data.rol;
    this.id = data.id;
  }
}

module.exports = SessionDTO;
