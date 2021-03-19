const express = require('express')
const {verificaToken} = require('../middlewares/autenticacion')

let app = express()
let Producto = require('../models/producto')

//*** Listar todas los productos ***/
app.get('/productos', (req, res)=>{

})

//*** Listar un producto por ID ***/
app.get('/productos/:id', (req, res)=>{
    
})

//*** Crear un producto ***/
app.post('/productos', (req, res)=>{
    
})

//*** Actualizar un producto ***/
app.put('/productos/:id', (req, res)=>{
    
})

//*** Eliminar un producto ***/
app.delete('/productos/:id', (req, res)=>{
    
})


module.exports = app