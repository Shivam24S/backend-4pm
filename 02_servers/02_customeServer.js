import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" });

  res.end("<h1>hello from node server</h1>");
});

const port = 5000;

server.listen(port, (err) => {
  if (err) {
    return console.log(err.message);
  }

  console.log(`server running on port ${port}`);
});
