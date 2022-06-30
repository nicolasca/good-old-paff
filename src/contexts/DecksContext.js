import { createContext, useContext, useReducer } from "react";

const DecksContext = createContext(null);
const DecksDispatchContext = createContext(null);

export function useDecks() {
  return useContext(DecksContext);
}

export function useDecksDispatch() {
  return useContext(DecksDispatchContext);
}

const initState = [];

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

function decksReducer(decks, action) {
  switch (action.type) {
    case "initDecks": {
      return action.decks;
    }
    default: {
      break;
    }
  }
}
