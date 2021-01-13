const express = require('express')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')

const app = express()

const server = http.createServer(app)

const io = socketIO(server)

const chatAppName = 'WeChat'

io.on('connection',socket => {
    socket.emit('message',`You are connected to the ${chatAppName}`)

    socket.on('room', room => {
        socket.join(room)

        socket.to(room).broadcast.emit('message',`User connected to the ${chatAppName}`)
        
        socket.on('chat-message',msg => {
            io.to(room).emit('message', msg)
        })
    })

    
})

app.use(express.static(path.join(__dirname,'public')))

const PORT = 6500 || process.env.PORT

server.listen(PORT,() => console.log(`Server is listning at port ${PORT} ....`))