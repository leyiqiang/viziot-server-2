
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
    socket.on('/total/count', function(data) {
      // chat.emit('/chat/message', data)
      // socket.broadcast.emit('/chat/message', data);

      // console.log(data)
    })
    socket.on('/total/count/500ms', function(data) {
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
    const result = await TcpDataDa.getRecentDataWithinNSeconds(interval)
    chat.emit('/chat/message', result);
  }, interval)

  setInterval(async () => {
    const result = await TcpDataDa.getTotalCountFromStartOfTheDay()
    console.log(result)
    chat.emit('/total/count', result);
  }, interval)

  setInterval(async () => {
    const result = await TcpDataDa.getTotalCountOfRecentDataWithinNSeconds(500)
    console.log(result)
    chat.emit('/total/count/500ms', result);
  }, 500)

// const news = io
//   .of('/news')
//   .on('connection', function (socket) {
//     socket.emit('item', { news: 'item' });
//   });

}

module.exports = {
  initSocketIO,
}
