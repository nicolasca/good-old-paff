import React from "react";

export const GameContext = React.createContext();

export const game = {
  board: Array(42).fill(null),
  decks: Array(2).fill(null),
  hands: Array(2).fill(null),
  phase: null,
  players: Array(2).fill(null),
};
