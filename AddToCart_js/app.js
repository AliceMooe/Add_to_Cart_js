let productDiv = document.querySelector("#product-div");
let cartsDiv = document.querySelector(".cart-table");
let showDiv = document.querySelector(".show");

// Render Products
function renderProducts() {
  products.forEach((product) => {
    productDiv.innerHTML += `
    <div class="col-12 col-lg-6 mb-4">
         <div class="card card-ctr">
            <div class="card-body">
                <img
                    src="${product.Image}" class="w-100"
                />
                <hr />
                <p class="fs-5 fw-bold">${product.Name}</p>
                <p>
                    Price - <span class="text-primary fs-5 fw-bold">$ ${product.Price}</span>
                </p>
                <div class="btn btn-primary w-100 cart-btn fs-6 fw-bold" onclick="addToCart(${product.ID})">
                    Add to cart
                </div>
            </div>
        </div>
    </div> 
    `;
  });
}

renderProducts();

// cart array
let carts = JSON.parse(localStorage.getItem("productCarts")) || [];

// add to carts array
function addToCart(ID) {
  if (carts.some((cart) => cart.ID === ID)) {
    changeQuantity("plus", ID);
  } else {
    let cart = products.find((product) => product.ID === ID);
    carts.push({
      ...cart,
      quantity: 1,
    });
  }
  updateCarts();
}

// render product add to cart
function renderProductsCarts() {
  showDiv.innerHTML = "";
  cartsDiv.innerHTML = "";
  carts.forEach((cart) => {
    cartsDiv.innerHTML += `
        <tr>
            <td>
                <img src="${cart.Image}" id="img-cart" title="${cart.Name}" />
            </td>
            <td>
                <p class="fs-5 pt-2">$ ${cart.Price}</p>
            </td>
            <td>
                <i class="fa-solid fa-circle-minus fs-5 text-primary pt-3" onclick = "changeQuantity('minus',${cart.ID})"></i>
                <span class="mx-2 fs-5 pt-3">${cart.quantity}</span>
                <i class="fa-solid fa-circle-plus fs-5 text-primary pt-3" onclick = "changeQuantity('plus' ,${cart.ID})"></i>
            </td>
            <td>
                <i class="fa-solid fa-trash text-danger fs-5 pt-3" onclick="removeCart(${cart.ID})" title="Remove"></i>
            </td>
        </tr>
     `;
  });
  showHide();
}

//Chnage quantity
function changeQuantity(condition, ID) {
  carts = carts.map((cart) => {
    let quantity = cart.quantity;
    if (cart.ID === ID) {
      if (condition === "plus") {
        quantity++;
      } else if (condition === "minus" && quantity > 1) {
        quantity--;
      }
    }
    return {
      ...cart,
      quantity,
    };
  });
  updateCarts();
}

//total prices and cart number
function renderNumber() {
  let totalprice = 0,
    totalcart = 0;
  carts.forEach((cart) => {
    totalprice += cart.Price * cart.quantity;
    totalcart += cart.quantity;
  });
  document.querySelector("#totalPrice").innerText = `$ ${totalprice}`;
  document.querySelector("#totalCart").innerText = `${totalcart}`;
}

//remove cart
function removeCart(ID) {
  carts = carts.filter((cart) => cart.ID !== ID);
  updateCarts();
}

//show hide
function showHide() {
  if (!cartsDiv.innerHTML) {
    showDiv.innerHTML = `
    <h5 class="text-center my-3 text-danger">
        <i class="fa-solid fa-cart-plus"></i> No items in cart.
    </h5>
    <hr />
              `;
  }
}

//update on everything
function updateCarts() {
  renderProductsCarts();
  renderNumber();
  localStorage.setItem("productCarts", JSON.stringify(carts));
}

updateCarts();
