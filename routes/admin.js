const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// /admin/add-product => POST
router.post('/add-product', (req, res) => {
  
  products.push({title: req.body.title});
  
  res.redirect('/');
});

exports.routes = router;
exports.products = products;