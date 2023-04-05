

const { model, Schema } = require('mongoose');

const productSchema = new Schema({
    name: String, /* tipos de mongoose, porque estan en mayuscula */
    description: String,
    price: Number,
    department: String,
    available: Boolean,
    stock: Number
});

module.exports = model('product', productSchema);   /* nombre del modelo en singular, mongo luego lo pone en plural */