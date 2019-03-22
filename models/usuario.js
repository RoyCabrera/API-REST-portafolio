const mongoose = require('mongoose');

var Schema = mongoose.Schema();

var UsuarioSchema = Schema({
    nombre:String,
    edad:Number,
    user:String,
    password:String
});


module.exports = mongoose.model('usuario',UsuarioSchema)

