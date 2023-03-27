import { create } from 'zustand'
import produce from 'immer'

export const useGameStore = create((set) => ({
    board: Array(42).fill(null),
    decks: {},
    hands: Array(2).fill(null),
    phase: null,
    players: Array(2).fill(null),
    setDeck: (deck, userUid) =>
        set(
            produce((state) => {
                state.decks[userUid] = deck
            })
        ),
    removeAllBears: () => set({ bears: 0 }),
}))