const mongoose = require('mongoose')

let Schema = mongoose.Schema

let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email:{
        type: String,
        required:[true, 'El email es requerido']
    }
    password:{
        type:String,
        required:[true, 'El password es requerido']
    },
    img:{
        type:String,
        required:false
    },
    role:{
        default:'USER_ROLE',
        required:[true, 'El rol es requerido']
    },
    estado:{
        type:Boolean,
        default: true
    },
    google:{
        type:Boolean,
        default: false
    }
})

module.exports = mongoose.model('Usuario', usuarioSchema)