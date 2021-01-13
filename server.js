const express = require('express')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')

const app = express()

const server = http.createServer(app)

const io = socketIO(server)

io.on('connection',socket => {
    io.emit('message','Hello')
})

app.use(express.static(path.join(__dirname,'public')))

const PORT = 6500 || process.env.PORT

server.listen(PORT,() => console.log(`Server is listning at port ${PORT} ....`))