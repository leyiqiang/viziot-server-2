
function initSocketIO(http) {

  const Server = require('socket.io');
  const io = new Server(http)
  const TcpDataDa = require('./api/tcpData/tcpData.da')


//
// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//   });
//
// });

  const chat = io
    .of('/chat')

  chat.on('connection', function (socket) {
    // console.log('a cat user connected');
    socket.on('/chat/message', function(data) {
      // chat.emit('/chat/message', data)
      // socket.broadcast.emit('/chat/message', data);

      // console.log(data)
    })
    //
    // socket.emit('a message', {
    //   that: 'only',
    //   '/chat': 'will get'
    // });
    // chat.emit('a message', {
    //   everyone: 'in',
    //   '/chat': 'will get'
    // });
  });


  const interval = 200
  setInterval(async () => {
    console.log('emitting to chat message')
    const result = await TcpDataDa.getRecentDataWithinNSeconds(interval)
    chat.emit('/chat/message', result);
  }, interval)

// const news = io
//   .of('/news')
//   .on('connection', function (socket) {
//     socket.emit('item', { news: 'item' });
//   });

}

module.exports = {
  initSocketIO,
}
