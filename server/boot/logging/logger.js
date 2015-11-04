module.exports = function (server) {
  var fs = require('fs');

  //Create logging directory
  try {
    fs.mkdirSync(server.get('logger').directory);
  } catch (e) {
    console.log(e);
  }

  //Install Winston logging
  server.logger = require('winston');

  server.logger.level = server.get('logger').level;

  server.logger.add(server.logger.transports.File, {filename: server.get('logger').directory + '/' + server.get('logger').filename});
};
