const debug = require('debug')('node-angular');
const http = require('http');
const { nodeModuleNameResolver } = require('typescript');
const app = require('./backend/app');
const ipconfig = require("./connection_config.js")


const normalizePort = val => {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // this is not a number idiot
    return val;
  }

  if (port >= 0){
    //0 is not a very good port
    return port;
  }

  return false;
}

const onError = error => {
  if (error.syscall !== "listen"){
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
  switch(error.code){
  case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
  case "EADDRINUSE":
    console.error(bind + " is already in use");
    process.exit(1);
    break;
  default:
    throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind)
}

const port = normalizePort(process.env.Port || ipconfig.nodeport);
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError)
server.on("listening", onListening)
server.listen(port)
console.log("Node running on " + ipconfig.nodeport)
