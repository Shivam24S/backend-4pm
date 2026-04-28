import http from "http";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("this is home page");
  } else if (req.url === "/about") {
    res.end("this is about page");
  } else {
    res.end("requested route is not found");
  }
});

const port = 5000;

server.listen(port, (err) => {
  if (err) {
    return console.log(err.message);
  }

  console.log(`server running on port ${port}`);
});
