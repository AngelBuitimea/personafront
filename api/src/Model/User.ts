const { Schema, model } = require('pg');

const userSchema = new Schema({
    correoElectronico: String,
    password: String
}, {
    timestamps: true
});

module.exports = model('User', userSchema, 'users');