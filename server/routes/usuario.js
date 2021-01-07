const express = require('express')
const Usuario = require('../models/usuario')

const app = express()

app.get('/usuario', function(req, res){
    res.json('get usuario')
})

app.post('/usuario', function(req, res){

    let body = req.body

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role
    })

    usuario.save((err, usuarioDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

})

app.put('/usuario/:id', function(req, res){

    let id= req.params.id

    res.json({
        id
    })
})

app.delete('/usuario', function(req, res){
    res.json('delete usuario')
})

module.exports= app