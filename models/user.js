const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this._id = id ? new mongodb.ObjectID(id) : null;
    this.cart = cart;
  }
  
  save() {
    const db = getDb();
    let dbOp;
  
    if (this._id) {
      dbOp = db.collection('users')
        .updateOne({_id: this._id}, {
          $set: this
        });
    } else {
      dbOp = db.collection('users').insertOne(this)
    }
  
    return dbOp
      .then(result => console.log(result))
      .catch(err => console.log(err))
  }
  
  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    
    if (cartProductIndex >= 0) {
      newQuantity = updatedCartItems[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({productId: new mongodb.ObjectID(product._id), quantity: 1});
    }
    
    const updatedCart = {items: updatedCartItems};
    
    const db = getDb();
    return db.collection('users').updateOne(
      {_id: new mongodb.ObjectID(this._id)},
      {$set: {cart: {...updatedCart}}})
  }
  
  static fetchAll() {
    const db = getDb();
    return db.collection('users').find().toArray()
      .then(users => {
        return users;
      })
      .catch(err => console.log(err))
  }
  
  static findById(userId) {
    const db = getDb();
    return db.collection('users')
      .findOne({_id: new mongodb.ObjectID(userId)})
      .then(user => {
        return user;
      })
      .catch(err => console.log(err))
  }
  
  static deleteById(userId) {
    const db = getDb();
    return db.collection('users').deleteOne({_id: new mongodb.ObjectID(userId)})
      .then(() => {
        console.log('deleted');
      })
      .catch(err => console.log(err))
  }
}

module.exports = User;