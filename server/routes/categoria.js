const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const Categoria = require('../models/categoria')
const { verificaToken } = require('../middlewares/autenticacion')
const app = express()

//*** Listar todas las categorías ***/
app.get('/categoria', (req, res)=>{

})

//*** Mostrar una categoría por ID ***/
app.get('/categoria/:id', (req, res)=>{
    // Categoria.findById(..)
})

//*** Crear nueva categoría ***/
app.post('/categoria', verificaToken, (req, res)=>{
    let body = req.body

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    })

    categoria.save((err, categoriaDB)=>{
        
        //*** por si hay error con la DB o servidor ***/
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        //*** ver error de por qué no se creó la categoria ***/
        if(!categoriaDB){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        //*** Si sale todo OK!!! ***/
        res.json({
            ok: true,
            categoria: categoriaDB
        })

    })

})

//*** Actualizar categoría ***/
app.put('/categoria/:id', (req, res)=>{
    
    //*** guardamos el ID ***/
    let id = req.params.id

    //*** guardamos la data del body ***/
    let body = req.body

    //*** Objeto para actualizar ***/
    let descCategoria = {
        descripcion = body.descripcion
    }

    //*** Actualizamos ***/
    Categoria.findByIdAndUpdate(id, descCategoria, {new: true, runValidators: true}, (err, categoriaDB)=>{
         //*** por si hay error con la DB o servidor ***/
         if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        //*** ver error de por qué no se creó la categoria ***/
        if(!categoriaDB){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        //*** Si sale todo OK!!! ***/
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })

})

//*** Eliminar categoría ***/
app.delete('/categoria/:id', (req, res)=>{
    
})


module.exports = app