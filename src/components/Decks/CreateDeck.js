import React from "react";
import CardList from "../Cards/CardList";
import FormDeck from "./FormDeck";

const defaultValue = { deck: [], cards: [], factionId: null };
export const DeckContext = React.createContext(defaultValue);

const CreateDeck = () => {
  return (
    <div>
      <DeckContext.Provider value={defaultValue}>
        <h2>Créer un deck</h2>
        <FormDeck />
        <CardList isDeckCreating={true} />
      </DeckContext.Provider>
    </div>
  );
};

export default CreateDeck;
