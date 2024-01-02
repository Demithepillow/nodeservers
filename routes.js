const fs = require('fs');

const requestHandler =(req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<head><title>Enter Message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message" ><button type="submit">Send</button> </form></body>')
        res.write('</html>')
        return res.end();
    }
//console.log(req.url, req.headers, req.method);
// process.exit(); - this is used to quit the event loop of the server. Not usually used in node.js as you want your server running
    if(url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>My first server page</title></head>')
    res.write('<body><h1> Hello from this Server</h1></body>')
    res.write('</html>')
    res.end();
};

module.exports = requestHandler;

// module.exports = {
// handler: requestHandler,
// someText: 'Some kinda cool text over there'
// }   this is a way to use the module exports function to export multiple items

// module.exports.handler = requestHandler;
// module.exports.someText = "Here is some very strange text"; this is a way to use the module exports function to export multiple items
