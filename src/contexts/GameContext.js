import { create } from 'zustand'
import produce from 'immer'

export const useGameStore = create((set) => ({
    id: "",
    name: "",
    board: Array(42).fill(null),
    decks: {},
    hands: Array(2).fill(null),
    unitsToDeploy: {},
    phase: null,
    players:{},
    player1: null,
    player2: null,
    squares: Array(42).fill(null),
    init:(game) => 
        set(
            produce((state) => {
                state.id = game.id;
                state.name = game.name;
                state.board = game.board;
                state.decks = game.decks;
                state.hands = game.hands;
                state.unitsToDeploy = game.unitsToDeploy;
                state.phase = game.phase;
                state.players = game.players;
                state.player1 = game.player1;
                state.player2 = game.player2;
                state.squares = game.squares;
            })
        ),
    setName: (name) => set({ name }),
    setId: (id) => set({ id }),
    setDeck: (deck, userUid) =>
        set(
            produce((state) => {
                state.decks[userUid] = deck
            })
        ),
    setUnitsToDeply: (units, userUid) =>
        set(
            produce((state) => {
                state.decks[userUid] = units
            })
        ),
    removeAllBears: () => set({ bears: 0 }),
    onDrop: ({card, newSquareId, previousSquareId, userUid}) => 
        set(
            produce((state) => {
                // Change the card square
                if (previousSquareId) {
                    state.squares[previousSquareId] = null;
                }
                state.squares[newSquareId] = card;

                 // Remove from hand if exists
                const hand = state.hands[userUid].filter(c => {
                  return c.gameCardId !== card.gameCardId;
                });

                state.hands[userUid] = hand;
            }
        )
    )
}))