import { create } from 'zustand'
import produce from 'immer'

const drop = (state, card, newSquareId, previousSquareId) => {
    // Remove from previous square
    if (previousSquareId) {
      state.squares[previousSquareId] = null;
    }
  
    // Remove from hand if exists
    // const hand = G.hands[ctx.playerID].filter(card => {
    //   return card.gameCardId !== options.card.gameCardId;
    // });
  
    // G.hands[ctx.playerID] = hand;
    // G.squares[options.squareId] = options.card;
  };

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
    onDrop: (card, newSquareId, previousSquareId) => 
        set(
            produce((state) => {
                console.log(card)
                drop(state, card, newSquareId, previousSquareId)
            }
        )
    )
}))