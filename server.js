const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') filePath = './index.html';

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    if (extname === '.js') contentType = 'text/javascript';
    if (extname === '.css') contentType = 'text/css';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(500);
            res.end('Error: ' + error.code + ' ..\n');
        } else {
            res.writeHead(200, {
                'Content-Type': contentType,
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
            });
            res.end(content, 'utf-8');
        }
    });
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');
