const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const Usuario = require('../models/usuario')
const app = express()

app.post('/login', (req, res) =>{
    let body = req.body
    Usuario.findOne({ email: body.email}, (err, usuarioDB) =>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'Usuario y/o password incorrectos'
                }
            })
        }

       if(!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'Usuario y/o password incorrectos'
                }
            })
       }

       let token = jwt.sign({
           usuario: usuarioDB
       }, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN})

       res.json({
           ok: true,
           usuario: usuarioDB,
           token
       })

    })

})

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    console.log(payload.name);
    console.log(payload.email);
  }

  // verify().catch(console.error);

app.post('/google', (req, res) =>{

    let token = req.body.idtoken

    verify(token)

    res.json({
        token
    })

})

module.exports = app