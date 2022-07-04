import { createContext, useContext, useReducer } from "react";

export const CardsContext = createContext(null);
export const CardsDispatchContext = createContext(null);

export const CardsProvider = ({ children }) => {
  const [cardsByFaction, dispatch] = useReducer(cardsReducer, initState);

  return (
    <CardsContext.Provider value={cardsByFaction}>
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
      const newCards = action.cards;
      const factions = action.factions;
      const cardsByFaction = [];
      factions.forEach((faction) => {
        const factionToAdd = { ...faction }; // Make the function pure
        newCards.forEach((card) => {
          if (!factionToAdd.cards) {
            factionToAdd.cards = [];
          }
          if (factionToAdd.id === card.faction_id) {
            card.count = 0;
            factionToAdd.cards.push(card);
          }
        });
        cardsByFaction.push(factionToAdd);
      });
      return cardsByFaction;
    }
    default: {
      break;
    }
  }
}
