var express = require('express')
var userRouter = require('./user/controller')
var osRouter = require('./os/controller')
var productRouter = require('./product/controller')
var mongoose = require('mongoose')
var app= express()
app.use(express.json())
app.use('/users', userRouter)
app.use('/os', osRouter)
app.use('/products', productRouter)
mongoose.connect('mongodb://localhost:27017/user-db')
        .then(()=>{
            console.log('DB connected !');            
        })
        .catch((error)=>{
            console.log("error : "+ error);
        })
var http = require('http')
var server = http.createServer(app)
server.listen(3009,()=>{
    console.log('server started !');
})