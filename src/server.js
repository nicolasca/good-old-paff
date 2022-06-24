const { Server, FlatFile, Origins } = require("boardgame.io/server");
const { default: PAFF } = require("./components/Game/PAFF");
// import PAFF from "./game/PAFF";

console.log("Run server boardgame js");

const PORT = process.env.PORT || 8000;
const server = Server({
  games: [PAFF],
  origins: [
    // Allow localhost to connect, except when NODE_ENV is 'production'.
    Origins.LOCALHOST_IN_DEVELOPMENT,
  ],
  db: new FlatFile({
    dir: "./storage/directory",
    logging: true,
  }),
});

server.run(PORT, () => {
  console.log(`Serving at: http://localhost:${PORT}/`);
});
