
process.env.PORT = process.env.PORT || 3000

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 365

process.env.SEED = process.env.SEED || 'secret' 

let urlDB

if (process.env.NODE_ENV === 'dev'){
   urlDB = 'mongodb://localhost:27017/cafe'
} else {
   urlDB = 'mongodb+srv://chino:1VGj3jOSKlvwJiO2@cluster0.n9k16.mongodb.net/test?retryWrites=true&w=majority'
}

process.env.URLDB = urlDB