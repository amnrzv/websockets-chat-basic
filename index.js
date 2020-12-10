const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require("socket.io")(http)

app.use(express.static("./public"));

app.get('/', (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "./public") })
})

http.listen(3000, () => {
    console.log('listening on *:3000');
});

io.on("connection", (socket) => {
    socket.emit("id", socket.id)

    socket.on("sendMsg", (name, msg) => {
        console.log(name, msg)
        socket.broadcast.emit("receiveMsg", name, msg)
    })

})