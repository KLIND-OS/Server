var express = require("express");
var path = require("path");
var logger = require("morgan");
var livereload = require("livereload");
const chokidar = require("chokidar");
var connectLiveReload = require("connect-livereload");
const port = 10000;

const watcher = chokidar.watch(".", {
  ignored: [".git"],
  persistent: true,
});

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

if (process.argv[2] == "dev") {
  watcher
    .on("add", () => {
      liveReloadServer.refresh("/");
    })
    .on("change", () => {
      liveReloadServer.refresh("/");
    })
    .on("unlink", () => {
      liveReloadServer.refresh("/");
    });
}

var app = express();

app.use(connectLiveReload());

function skipMiddleware(req) {
  return req.url.includes("/status");
}

app.use(logger("dev", { skip: skipMiddleware }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..")));

app.listen(port, "127.0.0.1", () => {
  console.log(`KLIND OS Server is running on port ${port}`);
});
