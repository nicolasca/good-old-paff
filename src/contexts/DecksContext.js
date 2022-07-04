import { createContext, useContext, useReducer } from "react";

const DecksContext = createContext(null);
const DecksDispatchContext = createContext(null);

export function useDecks() {
  return useContext(DecksContext);
}

export function useDecksDispatch() {
  return useContext(DecksDispatchContext);
}

const initState = {
  decks: [],
  deckInEdition: null,
};

export const DecksProvider = ({ children }) => {
  const [decks, dispatch] = useReducer(decksReducer, initState);
  return (
    <DecksContext.Provider value={decks}>
      <DecksDispatchContext.Provider value={dispatch}>
        {children}
      </DecksDispatchContext.Provider>
    </DecksContext.Provider>
  );
};

function decksReducer(state, action) {
  switch (action.type) {
    case "initDecks": {
      return {
        ...state,
        decks: action.decks,
      };
    }
    case "deleteDeck": {
      const filteredDecks = state.decks.filter((d) => d.id !== action.id);
      return {
        ...state,
        decks: filteredDecks,
      };
    }
    case "createDeckInEdition": {
      return {
        ...state,
        deckInEdition: { cards: action.faction.cards, faction: action.faction },
      };
    }
    case "setDeckInEdition": {
      return {
        ...state,
        deckInEdition: action.deck,
      };
    }
    case "setName": {
      return {
        ...state,
        deckInEdition: {
          ...state.deckInEdition,
          name: action.name,
        },
      };
    }
    case "addCount": {
      const cards = state.deckInEdition.cards.map((card) => {
        if (card.slug === action.card.slug) {
          action.card.count = action.count;
          return action.card;
        } else {
          return card;
        }
      });
      state.deckInEdition.cards = cards;
      return {
        ...state,
      };
    }
    case "updateAfterSave": {
      const newDeckList = state.decks.map((deck) => {
        if (deck.id === action.deck.id) {
          return action.deck;
        }
        return deck;
      });
      return {
        ...state,
        decks: newDeckList,
        deckInEdition: null,
      };
    }
    case "addDeck": {
      return {
        ...state,
        decks: [...state.decks, action.deck],
        deckInEdition: null,
      };
    }
    default: {
      break;
    }
  }
}
