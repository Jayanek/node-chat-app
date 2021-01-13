const socket = io()

socket.on('message',(msg) => {
  alert(msg)
})