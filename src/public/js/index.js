window.onload = LoadPage;
function LoadPage() {
  switch (true) {
    case window.location.pathname.startsWith('/views/products'):
      LoadPageProducts();
      break;
    case window.location.pathname.startsWith('/views/cart'):
      LoadPageCart();
      break;
    case window.location.pathname.startsWith('/views/managerProds'):
      LoadPageProdManager();
      break;
    case window.location.pathname.startsWith('/views/userManager'):
      LoadPageUserManager();
      break;
  }
}

async function LoadPageCart() {
  try {
    let amount = 0;
    const sessionInfo = await sessionData();
    const response = await fetch(`/api/cart/${sessionInfo.cartId}`);
    const data = await response.json();

    if (data.msg === 'Carrito encontrado con éxito') {
      const cart = data.data.products;
      const cartCont = document.getElementById('cart_container');

      cart.forEach((cart) => {
        const cartEl = document.createElement('div');
        cartEl.innerHTML = `<span>Nombre: ${cart.product.title}, Descripción: ${cart.product.price}, Código: ${cart.product.code}, Precio: ${cart.product.price}, Estado: ${cart.product.status}, Stock: ${cart.product.stock}, Categoria: ${cart.product.category}</span><button class="btnDelFromCart">DELETE</button>`;
        cartCont.appendChild(cartEl);
        amount += cart.product.price;

        const btnDelFromCart = cartEl.querySelector('.btnDelFromCart');
        asignEventDelFromCart(
          btnDelFromCart,
          cart.product._id,
          sessionInfo.cartId
        );
      });
    } else {
      const errorMessage = document.createElement('p');
      errorMessage.textContent = data.msg;
      document.body.appendChild(errorMessage);
    }

    const btnToProd = document.querySelector('#toProd');
    btnToProd.addEventListener('click', () => {
      window.location.href = '/views/products';
      LoadPage();
    });
    const btnCerrarCompra = document.querySelector('#cerrarCompra');
    btnCerrarCompra.addEventListener('click', async () => {
      const datosCompra = {
        cartId: sessionInfo.cartId,
        amount: amount,
        purchaser: sessionInfo.email,
      };

      await fetch('/api/compra/finalizarcompra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosCompra),
      });
      location.reload();
    });
  } catch (err) {
    console.error(err);
  }
}

async function LoadPageProducts() {
  try {
    const response = await fetch('/api/products');
    const data = await response.json();
    const sessionInfo = await sessionData();
    if (data.msg === 'Productos obtenidos con exito') {
      const products = data.data.docs;
      const prodCont = document.getElementById('prod_container');
      let id_cont = 0;

      products.forEach((product) => {
        const productEl = document.createElement('div');
        productEl.innerHTML = `<span>Nombre: ${product.title}, Descripción: ${product.price}, Código: ${product.code}, Precio: ${product.price}, Estado: ${product.status}, Stock: ${product.stock}, Categoria: ${product.category}</span> <button class="btnAddToCart">ADD TO CART</button><span id="msg${id_cont}"></span>`;
        prodCont.appendChild(productEl);

        const btnAddToCart = productEl.querySelector('.btnAddToCart');
        asignEventAddToCart(
          btnAddToCart,
          product._id,
          id_cont,
          sessionInfo.cartId
        );
        id_cont++;
      });
    } else {
      const errorMessage = document.createElement('p');
      errorMessage.textContent = data.msg;
      document.body.appendChild(errorMessage);
    }

    const btnToCart = document.querySelector('#toCart');
    btnToCart.addEventListener('click', () => {
      window.location.href = '/views/cart';
    });

    const btnLogout = document.querySelector('#logout');
    btnLogout.addEventListener('click', async () => {
      await fetch('/api/auth/logout');
    });

    const btnToManager = document.querySelector('#toManager');
    btnToManager.addEventListener('click', async () => {
      window.location.href = '/views/managerProds';
    });
    const btnToUsers = document.querySelector('#toUsers');
    btnToUsers.addEventListener('click', () => {
      window.location.href = '/views/userManager';
    });
  } catch (err) {
    console.error(err);
  }
}

async function LoadPageProdManager() {
  const btnAdd = document.querySelector('#btnAdd');
  btnAdd.addEventListener('click', async () => {
    let txtTit = document.querySelector('#txtTit');
    let txtDesc = document.querySelector('#txtDesc');
    let txtPrice = document.querySelector('#txtPrice');
    let chkState = document.querySelector('#chkState');
    let txtStock = document.querySelector('#txtStock');
    let txtCat = document.querySelector('#txtCat');
    const response = await fetch('/api/products/addProd', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: txtTit.value,
        desc: txtDesc.value,
        price: txtPrice.value,
        status: chkState.value,
        stock: txtStock.value,
        category: txtCat.value,
      }),
    });
    const data = await response.json();
    const msgCont = document.querySelector('#msgCont0');
    msgCont.textContent = data.msg;
    setTimeout(() => {
      msgCont.textContent = '';
    }, 3000);
  });

  const btnDel = document.querySelector('#btnDelete');
  btnDel.addEventListener('click', async () => {
    let code = document.querySelector('#txtId').value;
    const response = await fetch('/api/products/delProd', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: code }),
    });
    const data = await response.json();

    const msgCont = document.querySelector('#msgCont1');

    msgCont.textContent = data.msg;

    setTimeout(() => {
      msgCont.textContent = '';
    }, 3000);
  });
}
async function LoadPageUserManager() {
  const cont = document.querySelector('#usrsContainer');
  const contSet = document.querySelector('#usrsSettings');
  const response = await fetch('/api/users');
  const data = await response.json();

  data.forEach((e) => {
    const userEl = document.createElement('div');
    userEl.innerHTML = `<span>Email: ${e.email}, Nombre: ${e.name}, Rol: ${e.rol}</span>`;
    cont.appendChild(userEl);
  });

  const btnChangeRol = document.querySelector('#changerol');
  btnChangeRol.addEventListener('click', async () => {
    const newRol = document.querySelector('#cmbbox').value;
    const email = document.querySelector('#txtemail').value;
    const response = await fetch('/api/users/change_rol', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newRol: newRol,
        email: email,
      }),
    });
    const data = await response.json();
    if (data.data) {
      contSet.innerHTML += '<span>Rol modificado con éxito</span>';
      location.reload();
    } else contSet.innerHTML += '<span>Error al modificar el rol</span>';
  });
  const btnDeleteUser = document.querySelector('#deleteuser');
  btnDeleteUser.addEventListener('click', async () => {
    const email = document.querySelector('#txtemail').value;
    const response = await fetch('/api/users', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await response.json();
    if (data.data) {
      contSet.innerHTML += '<span>Usuario eliminado con éxito</span>';
      location.reload();
    } else contSet.innerHTML += '<span>Error al eliminar el usuario</span>';
  });
}
async function sessionData() {
  try {
    const response = await fetch('/api/session/current');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

function asignEventDelFromCart(btnDivGame, data, cartId) {
  btnDivGame.addEventListener('click', () => {
    delFromCart(data, cartId);
  });
}

function asignEventAddToCart(btnDivGame, data, id_cont, cartId) {
  btnDivGame.addEventListener('click', () => {
    addToCart(data, id_cont, cartId);
  });
}

async function addToCart(data, id_cont, cartId) {
  try {
    const response = await fetch(`/api/cart/addProdToCart/${cartId}/${data}`, {
      method: 'PUT',
    });
    const responseData = await response.json();
    const msgSpan = document.getElementById(`msg${id_cont}`);
    if (responseData.msg === 'Producto agregado con éxito al carrito') {
      msgSpan.textContent = 'Producto agregado al carrito';
    } else {
      msgSpan.textContent = 'Error al agregar producto al carrito';
    }

    setTimeout(() => {
      msgSpan.textContent = '';
    }, 3000);
  } catch (err) {
    console.error(err);
  }
}
async function delFromCart(data, cartId) {
  try {
    const response = await fetch(`/api/cart/${cartId}/products/${data}`, {
      method: 'DELETE',
    });
    await response.json();
    location.reload();
  } catch (err) {
    console.error(err);
  }
}
