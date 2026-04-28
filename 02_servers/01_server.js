import http from "http";

const server = http.createServer((req, res) => {
  res.write("hello from node server");
  res.end();
});

const port = 5000;

server.listen(port, (err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log(`server running on port ${port}`);
});
