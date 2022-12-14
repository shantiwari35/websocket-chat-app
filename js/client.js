const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

var audio = new Audio('ting.mp3');
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);

    messageElement.classList.add('box-shadow-3d');
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
        messageElement.classList.add('box-shadow-3d-left');
    } else {
        messageElement.classList.add('box-shadow-3d-right');
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})
var userName = prompt('Enter Your name to join');
socket.emit('new-user-joined', userName);

socket.on('user-joined', data => {
    append(`${data} joined the chat`, 'right');
});

socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'left');
});

socket.on('left', data => {
    append(`${data} left the chat`, 'left');
});