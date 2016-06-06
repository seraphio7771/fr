
  var socket = require("./lib/mysocket").create();
  console.log('APP started');

/*
  socket.init({"address": "http://192.168.1.55:8080/", "actions": ["point", "connect", "disconnect"]});

  socket.on('connect', function () {
    console.log('connected!');
    // socket.emit('subscribe', {message: {assetId: 1}});
  });

  socket.on('disconnect', function () {
    console.log('disconnect!');
  });

  socket.on('point', function (data) {
    console.log('point!', data);
  });
*/
