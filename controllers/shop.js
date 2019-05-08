const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res) => {
  const {productId} = req.params;
  
  Product.findById(productId,(product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  });
};

exports.getIndex = (req, res) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find((prod) => prod.id === product.id);
        if (cartProductData) {
          cartProducts.push({
            productData: product,
            qty: cartProductData.qty
          });
        }
      }
      
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: cartProducts
      })
    });
  });
};

exports.postCart = (req, res) => {
  const {productId} = req.body;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
    
    res.render('shop/cart', {
      pageTitle: 'Your Cart',
      path: '/cart'
    })
  });
};

exports.postCartDeleteProduct = (req, res) => {
  const {productId} = req.body;
  Product.findById(productId, ({price}) => {
    Cart.deleteProduct(productId, price);
    res.redirect('/cart')
  });
};

exports.getOrders = (req, res) => {
  res.render('shop/orders', {
    pageTitle: 'Your Orders',
    path: '/orders'
  })
};

exports.getCheckout = (req, res) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  })
};