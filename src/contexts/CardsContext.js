import { createContext, useContext, useReducer } from "react";

export const CardsContext = createContext(null);
export const CardsDispatchContext = createContext(null);

export const CardsProvider = ({ children }) => {
  const [cards, dispatch] = useReducer(cardsReducer, initState);

  return (
    <CardsContext.Provider value={cards}>
      <CardsDispatchContext.Provider value={dispatch}>
        {children}
      </CardsDispatchContext.Provider>
    </CardsContext.Provider>
  );
};

export function useCards() {
  return useContext(CardsContext);
}

export function useCardsDispatch() {
  return useContext(CardsDispatchContext);
}

const initState = [];

function cardsReducer(cards, action) {
  switch (action.type) {
    case "setCardsByFaction": {
      const cards = action.cards;
      const factions = action.factions;

      factions.forEach((faction) => {
        cards.forEach((card) => {
          if (!faction.cards) {
            faction.cards = [];
          }
          if (faction.id === card.faction_id) {
            faction.cards.push(card);
          }
        });
      });
      return factions;
    }
    default: {
      break;
    }
  }
}
