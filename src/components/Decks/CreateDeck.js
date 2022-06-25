import { collection, getDocs, orderBy, query } from "firebase/firestore/lite";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../..";
import CardList from "../Cards/CardList";
import { DeckContext } from "../Layout/Layout";
import FormDeck from "./FormDeck";

const CreateDeck = () => {
  const [factionsOptions, setFactionsOptions] = useState(null);
  const [cardsToDisplay, setCardsToDisplay] = useState(null);

  const [factions, setFactions] = useState(null);
  const { faction, setAllCards, allCards, setFaction } =
    useContext(DeckContext);

  const handleChangeFaction = (event) => {
    const selectedFaction = factions.find(
      (faction) => event.target.value === faction.slug
    );
    setFaction(selectedFaction);

    const cardsOfFaction = [];
    allCards.forEach((unit) => {
      if (selectedFaction.id === unit.faction_id) {
        cardsOfFaction.push(unit);
      }
    });
    setCardsToDisplay(cardsOfFaction);
  };

  useEffect(() => {
    if (factions) {
      const options = factions.map((faction) => {
        return (
          <option key={faction.id} value={faction.slug}>
            {faction.name}
          </option>
        );
      });
      setFactionsOptions(options);
    }
  }, [factions]);

  useEffect(() => {
    const fetchData = async () => {
      // Factions
      const factionsCol = collection(db, "factions");
      const q = query(factionsCol, orderBy("name"));
      const factionsSnapshot = await getDocs(q);
      const factionList = factionsSnapshot.docs.map((doc) => doc.data());

      const selectedFaction = factionList[0];
      setFactions(factionList);
      setFaction(selectedFaction);

      // Cards
      const cardsCol = collection(db, "units");
      const cardsSnapshot = await getDocs(cardsCol);
      const unitList = cardsSnapshot.docs.map((doc) => doc.data());
      setAllCards(unitList);

      const cardsOfFaction = [];
      unitList.forEach((unit) => {
        if (selectedFaction.id === unit.faction_id) {
          cardsOfFaction.push(unit);
        }
      });
      setCardsToDisplay(cardsOfFaction);
    };
    fetchData().catch((error) => console.log(error));
  }, [setAllCards, setFaction]);

  return (
    <div>
      <h2>Créer un deck</h2>
      <FormDeck />
      {factions && factions.length > 0 ? (
        <select onChange={handleChangeFaction}>{factionsOptions}</select>
      ) : null}
      {faction ? (
        <CardList
          cards={cardsToDisplay}
          faction={faction}
          isDeckCreating={true}
        />
      ) : null}
    </div>
  );
};

export default CreateDeck;
