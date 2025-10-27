const express = require("express")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const cors = require('cors')

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"]
    },
})

io.on("connection", (socket) => {
    console.log(`User Conntected ${socket.id}`)

    socket.on('join_room', (data) => {
        socket.join(data)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
    })

    // socket.on('send_message', (data) => {
    //     socket.broadcast.emit("receive_message", data)
    // })
})


server.listen(5000, () => {
    console.log("SERVER RUNING ON PORT 5000")
})





