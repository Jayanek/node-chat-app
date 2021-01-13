const socket = io()

const chatForm = document.getElementById('chat-form')

const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix:false});

socket.emit('room',room)

socket.on('message',(msg) => {
  renderMessage(msg)
})

chatForm.addEventListener('submit',(e) => {
  e.preventDefault()
  socket.emit('chat-message',e.target.elements.msg.value)
  e.target.elements.msg.value = ""
})

function renderMessage(msg){
  const div = document.createElement('div')
  div.className = 'message'
  div.innerHTML = `	<p class="meta">Brad <span>9:12pm</span></p>
  <p class="text">
    ${msg}
  </p>`
  document.querySelector('.chat-messages').appendChild(div)
}