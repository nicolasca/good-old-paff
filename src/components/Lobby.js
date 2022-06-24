import { Lobby } from "boardgame.io/react";
import React from "react";
import { default as Game } from "./Game/PAFF";
import { default as Board } from "./Game/Board";

Game.minPlayers = 2;
Game.maxPlayers = 2;

const hostname = window.location.hostname;

const LobbyView = () => (
  <Lobby
    gameServer={`http://${hostname}:8000`}
    lobbyServer={`http://${hostname}:8000`}
    gameComponents={[{ game: Game, board: Board }]}
    debug={false}
  />
);

export default LobbyView;
