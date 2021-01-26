
process.env.PORT = process.env.PORT || 3000

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

let urlDB

if (process.env.NODE_ENV === 'dev'){
   urlDB = 'mongodb://localhost:27017/cafe'
} else {
   urlDB = 'mongodb+srv://chino:CgAPngw73Q39llz0@cluster0.n9k16.mongodb.net/test?retryWrites=true&w=majority'
}

process.env.URLDB = urlDB