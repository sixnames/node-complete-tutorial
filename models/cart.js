const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  
  static addProduct(productId, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart  = {products: [], totalPrice: 0};
      
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      
      const existingProductIndex = cart.products.findIndex(({id}) => productId === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = {...existingProduct, qty: existingProduct.qty + 1};
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else  {
        updatedProduct = {id: productId, qty: 1};
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    })
  }
  
  static deleteProduct(itemId, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return
      }
      
      const updatedCart = {...JSON.parse(fileContent)};
      const product = updatedCart.products.find(prod => prod.id === itemId);
      const {qty} = product;
  
      updatedCart.products = updatedCart.products.filter(({id}) => itemId !== id);
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * qty;
  
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    })
  }
};