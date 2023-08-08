const socket = io('https://chat-server-y3bn.onrender.com',{ transports : ['websocket'] });

const form = document.getElementById('send-container');

const messageInput = document.getElementById('messageInp');

const messageContainer = document.querySelector('.container')

var audio = new Audio('/public/chat.mp3');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`<b>You:</b> ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value='';
});
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.appendChild(messageElement)
    messageContainer.scrollTop = messageContainer.scrollHeight;
    if(position=='left'){
        audio.play();
    }
};

const userName = prompt('Enter your name: ')
// const userName = 'lol'

socket.emit('new-user-joined', userName)

socket.on('user-joined', name=>{
    append(`<b>${name}</b> joined chat `, 'left')
});

socket.on('recieve', data=>{
    append(`<b>${data.name}</b>: ${data.message}`, 'left');
});
socket.on('leave', name=>{
    append(`<b>${name}</b> left the chat`, 'left');
});