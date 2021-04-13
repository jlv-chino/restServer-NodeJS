const express = require('express')
const app = express()

app.use(require('./usuario'))
app.use(require('./login'))
app.use(require('./categoria'))
app.use(require('./productos'))
app.use(require('./upload'))

module.exports = app