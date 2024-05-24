import http from 'http';

const hostname = '127.0.0.1';
const port = 3000;

const carServer = http.createServer((req, res) => {
  const content = 'Hello World';

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(content);
});

carServer.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
