var express = require('express');
var app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/perspective-raf.html');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});