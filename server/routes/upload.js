const { json } = require('body-parser')
const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()

const Usuario = require('../models/usuario')

const fs = require('fs')
const path = require('path')

app.use(fileUpload())

app.put('/upload/:tipo/:id', function(req, res){

    let tipo = req.params.tipo
    let id = req.params.id

    if(!req.files){
        return res.status(400)
                  .json({
                        ok: false,
                        err:{
                            message: 'No hay archivo seleccionado'
                        }
                    })
    }  

    let tiposValidos = ['productos', 'usuarios']
    if(tiposValidos.indexOf(tipo)<0){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Tipos permitidos: ' + tiposValidos.join(', ')
            }
        })    
    }

    let archivo = req.files.archivo
    let nombreCortado = archivo.name.split('.')
    let extension = nombreCortado[nombreCortado.length -1]
    let extensionesValidas = ['png', 'jpg', 'jpeg']
    if(extensionesValidas.indexOf(extension)<0){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Sólo se admiten archivos' + extensionesValidas.join(', ')
            }
        })
    }

    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`

    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err)=>{
        if(err)
            return res.status(500).json({
                ok: false,
                err
            })

        imagenUsuario(id, res, nombreArchivo)    

    })
})

function imagenUsuario(id, res, nombreArchivo){
    Usuario.findById(id, (err, usuarioDB)=>{
        if(err){
            borraArchivo(nombreArchivo, 'usuarios')
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!usuarioDB){
            borraArchivo(nombreArchivo, 'usuarios')
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario no existe en la DB'
                }
            })
        }

        borraArchivo(usuarioDB.img, 'usuarios')

        usuarioDB.img = nombreArchivo

        usuarioDB.save((err, usuarioGuardado)=>{
            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            })
        })

    })
}

function imagenProducto(){

}

function borraArchivo(nombreImagen, tipo){
    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`)
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen)
        }
}

module.exports = app