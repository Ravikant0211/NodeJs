const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url === "/") {
        res.end('Hello from Home');
    } else if (req.url === "/about") {
        res.end("Hello from About");
    } else if (req.url === "/contact") {
        res.end("Hello from contact");
    } else {
        res.writeHead(404, { "content-type": "text/html" });
        res.end("Page not found");
    }
});

server.listen(3000, "127.0.0.1", () => {
    console.log("Listen to the port no 3000");
});