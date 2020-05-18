const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const server = express()

// pegar css e routes, ponte para o server 
server.use(express.static('public'))
server.use(routes)

// usar variaveis no html 
server.set('view engine', 'njk')
nunjucks.configure('views', {
    express: server,
    noCache: true
})

// iniciar servidor npm start
server.listen(5000, function() {
    console.log('server is running')
})