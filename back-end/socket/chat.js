module.exports = function (io) {

    io.on('connection', (socket) => {

        socket.on('new-user', (data) => {
            // console.log(data);
            io.emit('notification', {type: 'new_user', data: data});
        });

        socket.on('disconnect', (data) => {
            // console.log(data);
            io.emit('notification', {type: 'removed_user', data: data});
        });

        socket.on('new-message', (data) => {
            // console.log(data);
            io.emit('notification', {type: 'new_message', data: data});

            fetch('http://localhost:3000/messages', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({text: data.message, date: new Date(), user: socket.id, username: data.username})
            })
        });
    })
}