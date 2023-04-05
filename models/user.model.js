const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    active: Boolean,
    cart: [{ type: Schema.Types.ObjectId, ref: 'product' }]  //todo esto del type se usa para establecer la relacion entre tablas en mongodb
}, {
    timestamps: true
});

module.exports = model('user', userSchema);