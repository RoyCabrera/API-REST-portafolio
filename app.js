'use strict'
const express = require('express');
const bodyparser = require('body-parser');


var app = express();

//CARGAR ARCHIVOS DE RUTAS

var ruta = require('./routes/project');

// CONFIGURAR CABECERAS Y CORS

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//MIDDLEWARES

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//RUTAS

app.use("/api",ruta);
//EXPORTAR 

module.exports = app;




