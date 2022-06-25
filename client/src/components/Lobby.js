import { Lobby } from "boardgame.io/react";
import React from "react";
import { default as Game } from "./Game/PAFF";
import { default as Board } from "./Game/Board";

Game.minPlayers = 2;
Game.maxPlayers = 2;

const { protocol, hostname, port } = window.location;
const server = `${protocol}//${hostname}:${port}`;

const LobbyView = () => (
  <Lobby
    gameServer={server}
    lobbyServer={server}
    gameComponents={[{ game: Game, board: Board }]}
    debug={false}
  />
);

export default LobbyView;
