var staticServer = require('node-static');
var http = require('http');

var file = new (staticServer.Server)();

var httpServer = http.createServer(function (req, res) {
  file.serve(req, res);
});

var port = Number(process.env.PORT || 5000);
httpServer.listen(port);

console.log("[.] Server running on port "+ port +"...");