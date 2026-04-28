import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  fs.readFile("index.html", (err, data) => {
    if (err) {
      return res.end("file not found");
    } else {
      res.end(data);
    }
  });
});

const port = 5000;

server.listen(port, (err) => {
  if (err) {
    return console.log(err.message);
  }

  console.log(`server running on port ${port}`);
});
