import { create } from 'zustand'
import produce from 'immer'

export const useGameStore = create((set) => ({
    id: "",
    name: "",
    board: Array(42).fill(null),
    decks: {},
    hands: Array(2).fill(null),
    phase: null,
    players: Array(2).fill(null),
    setName: (name) => set({ name }),
    setId: (id) => set({ id }),
    setDeck: (deck, userUid) =>
        set(
            produce((state) => {
                state.decks[userUid] = deck
            })
        ),
    removeAllBears: () => set({ bears: 0 }),
}))