const { Server, FlatFile, Origins } = require("boardgame.io/server");
const serve = require("koa-static");
const path = require("path");
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

// Build path relative to the server.js file
const frontEndAppBuildPath = path.resolve(__dirname, "./build");
server.app.use(serve(frontEndAppBuildPath));

server.run(PORT, () => {
  server.app.use(
    async (ctx, next) =>
      await serve(frontEndAppBuildPath)(
        Object.assign(ctx, { path: "index.html" }),
        next
      )
  );
});
