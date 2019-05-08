const Product = require('../models/product');

exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin products',
      path: '/admin/products'
    });
  });
};

exports.getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.getEditProduct = (req, res) => {
  const {edit} = req.query;
  const {productId} = req.params;
  
  if (!edit) {
    res.redirect('/');
  }
  
  Product.findById(productId, (product) => {
    if (!product) {
      res.redirect('/');
    }
    
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: edit,
      product
    });
  });
};

exports.postEditProduct = (req, res) => {
  const {productId, title, price, description, imageUrl} = req.body;
  const updatedProduct = new Product(productId, title, imageUrl, description, price);
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.postAddProduct = (req, res) => {
  const {title, imageUrl, description, price} = req.body;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  
  res.redirect('/');
};