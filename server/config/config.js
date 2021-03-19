
process.env.PORT = process.env.PORT || 3000

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

process.env.CADUCIDAD_TOKEN = '8760h'

process.env.SEED = process.env.SEED || 'secret' 

let urlDB

if (process.env.NODE_ENV === 'dev'){
   urlDB = 'mongodb://localhost:27017/cafe'
} else {
   urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB

process.env.CLIENT_ID = process.env.CLIENT_ID || '774321510682-caf54h9uqbhodqtgimd0c14in9pnu2df.apps.googleusercontent.com'