import React, { useEffect } from "react";
import { useCards } from "../../contexts/CardsContext";
import { useDecks, useDecksDispatch } from "../../contexts/DecksContext";
import CardList from "../Cards/CardList";
import FormDeck from "./FormDeck";

const CreateDeck = () => {
  const cardsByFaction = useCards();
  const { deckInEdition } = useDecks();
  const dispatch = useDecksDispatch();

  const handleChangeFaction = (event) => {
    const newSelectedFaction = cardsByFaction.find(
      (faction) => event.target.value === faction.slug
    );

    dispatch({
      type: "createDeckInEdition",
      faction: newSelectedFaction,
    });
  };

  useEffect(() => {
    dispatch({
      type: "createDeckInEdition",
      faction: cardsByFaction[0],
    });
  }, [cardsByFaction, dispatch]);

  const factionsOptions = cardsByFaction.map((faction) => {
    return (
      <option key={faction.id} value={faction.slug}>
        {faction.name}
      </option>
    );
  });

  return (
    <div>
      <h2>Créer un deck</h2>
      <FormDeck />
      {cardsByFaction ? (
        <select onChange={handleChangeFaction}>{factionsOptions}</select>
      ) : null}
      {deckInEdition ? (
        <CardList
          cards={deckInEdition.cards}
          faction={deckInEdition.faction}
          isDeckCreating={true}
        />
      ) : null}
    </div>
  );
};

export default CreateDeck;
