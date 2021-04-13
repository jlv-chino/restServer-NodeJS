const { json } = require('body-parser')
const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()

app.use(fileUpload())

app.put('/upload', function(req, res){

    if(!req.files){
        return res.status(400)
                  .json({
                        ok: false,
                        err:{
                            message: 'No hay archivo seleccionado'
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

    archivo.mv(`uploads/${archivo.name}`, (err)=>{
        if(err)
            return res.status(500).json({
                ok: false,
                err
            })

            res.json({
                ok: true,
                message: 'Imagen subida con éxito!!!'
            })
    })
})

module.exports = app