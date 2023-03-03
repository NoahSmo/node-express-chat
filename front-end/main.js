(function () {
    const server = 'http://127.0.0.1:3000'
    const input = document.querySelector('.input');
    const sendButton = document.querySelector('.sendButton');
    const messages = document.querySelector('.messages');
    const username = prompt("Quel est votre nom d'utilisateur?");
    const numberOfMessages = document.querySelector('.numberOfMessages');
    const socket = io(server);

    socket.emit('new-user', username);
    socket.emit('get-messages');

    getMessages();

    function getMessages() {
        fetch('http://localhost:3000/messages')
            .then(response => response.json())
            .then(data => {
                numberOfMessages.textContent = data.length;
                data.forEach((message) => {
                    console.log(message);
                    addMessage({type: 'display_messages', data: message});
                })
            })
    }



    sendButton.addEventListener('click', () => {
        socket.emit('new-message', {message: input.value, username : username});
        input.value = '';
    });

    input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            socket.emit('new-message', {message: input.value, username : username});
            input.value = '';
        }
    });

    socket.on('notification', (data) => {
        console.log(data);
        addMessage(data);
    });

    socket.on('user-connected', () => {
        socket.emit('new-user', username);
    });

    socket.on('user-disconnected', () => {
        socket.emit('disconnect', username);
    });



    function addMessage(data) {

        var message = document.createElement('li');

        if (data.data.user === username) { message.classList.add('me'); }

        var authorBox = document.createElement('div');
        authorBox.classList.add('name');
        var author = document.createElement('span');
        var messageBox = document.createElement('div');
        messageBox.classList.add('message');
        var messageText = document.createElement('span');
        var messageDate = document.createElement('span');
        messageDate.classList.add('msg-time');


        if (data.type === 'new_user') {
            if (data.data === username) { message.classList.add('me'); }
            author.textContent = data.data;
            messageText.textContent = 'a rejoint la conversation';
            messageDate.textContent = "test";
        }

        else if (data.type === 'removed_user') {
            author.textContent = data.data;
            messageText.textContent = 'a quitté la conversation';
            messageDate.textContent = "test";
        }

        else if (data.type === 'new_message') {
            numberOfMessages.textContent = messages.childElementCount + 1;

            author.textContent = data.data.username;
            messageText.textContent = data.data.message;
            messageDate.textContent = data.data.date;
        }

        else if (data.type === 'display_messages') {
            numberOfMessages.textContent = messages.childElementCount + 1;

            author.textContent = data.data.username;
            messageText.textContent = data.data.text;
            messageDate.textContent = data.data.date;
        }


        authorBox.appendChild(author);
        messageBox.appendChild(messageText);
        messageBox.appendChild(messageDate);
        message.appendChild(authorBox);
        message.appendChild(messageBox);
        messages.appendChild(message);

    }

})();

