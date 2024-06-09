const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        serveFile('html/home.html', res);
    } else if (req.url === '/about') {
        serveFile('html/about.html', res);
    } else if (req.url === '/contact') {
        serveFile('html/contact.html', res);
    } else {
        serveNotFound(res);
    }
});

function serveFile(filePath, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // Call the function to serve the custom error page instead of an internal server error
            console.error(err);
            serveErrorPage(res);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
}

function serveNotFound(res) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1><p>The resource you are looking for could not be found.</p>');
}

function serveErrorPage(res) {
    // A more graceful error page
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end('<h1>500 Internal Server Error</h1><p>Sorry, something went wrong on our end.</p>');
}

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
