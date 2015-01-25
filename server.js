var http = require('http');
var path = require('path');
var mime = require('mime');
var fs = require('fs');

function send(res, code, type, data) {
    res.writeHead(code, {'Content-Type': type});
    res.end(data);
    }

var webServer = http.createServer(
    function(req, res) {
        var fileName = path.join(__dirname + '/../', req.url);
        var split = fileName.split('?');
        if (split.length > 1)
        {
            fileName = split[0];
        }
        fs.readFile(
            fileName,
            function (err, data){
                if (err)
                    send(res, 404, 'text/plain', 'File not found: ' 
                        + req.url
                        + ' ' + JSON.stringify(err))
                else { 
                    send(res, 200, mime.lookup(fileName), data); 
                }});
        });

webServer.listen(81);
