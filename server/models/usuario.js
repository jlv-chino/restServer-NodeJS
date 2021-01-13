const mongoose = require('mongoose')
const uniqueValidator =require('mongoose-unique-validator')


let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema

let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email:{
        type: String,
        unique: true,
        required:[true, 'El email es requerido']
    },
    password:{
        type: String,
        required:[true, 'El password es requerido']
    },
    img:{
        type:String,
        required:false
    },
    role:{
        type: String,
        default:'USER_ROLE',
        enum: rolesValidos
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

usuarioSchema.methods.toJSON = function(){
    let user = this
    let userObject = user.toObject()
    delete userObject.password

    return userObject
}

usuarioSchema.plugin(uniqueValidator, {message:'{PATH} ya se encuentra registrado en la BD'})

module.exports = mongoose.model('Usuario', usuarioSchema)