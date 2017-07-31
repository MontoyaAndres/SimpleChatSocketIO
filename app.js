const express = require('express'),
    app = express()
    http = require('http').createServer(app),
    io = require('socket.io')(http),
    port = process.env.PORT || 80

app.use(express.static(`${__dirname}/public`))
app.get('/', (req, res) => res.sendFile(`${__dirname}/public/index.html`))

http.listen(port, () => console.log(`Listening on port ${port}`))

io.on('connection', socket => {
    socket.emit('message', {
        message: 'Welcome to my first chat',
        color: 'green'
    })
    socket.on('send', data => {
        io.emit('message', data)
    })
})