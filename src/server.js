const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express()

// pegar css e routes, ponte para o server 
server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

// usar variaveis no html 
server.set('view engine', 'njk')
nunjucks.configure('src/app/views', {
    express: server,
    noCache: true
})

// iniciar servidor npm start
server.listen(5000, function() {
    console.log('server is running')
})