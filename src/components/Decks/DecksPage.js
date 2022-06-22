import { collection, getDocs, orderBy, query } from "firebase/firestore/lite";
import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { db } from "../..";
import { DeckContext } from "../Layout/Layout";
import DeckList from "./DeckList";

const DecksPage = () => {
  const { setAllCards, setFaction } = useContext(DeckContext);

  useEffect(() => {
    const fetchData = async () => {
      // Factions
      const factionsCol = collection(db, "factions");
      const q = query(factionsCol, orderBy("name"));
      const factionsSnapshot = await getDocs(q);
      const factionList = factionsSnapshot.docs.map((doc) => doc.data());

      const selectedFaction = factionList[0];

      setFaction(selectedFaction);

      // Cards
      const cardsCol = collection(db, "units");
      const cardsSnapshot = await getDocs(cardsCol);
      const unitList = cardsSnapshot.docs.map((doc) => doc.data());
      setAllCards(unitList);

      factionList.forEach((faction) => {
        faction.units = [];
        unitList.forEach((unit) => {
          if (faction.id === unit.faction_id) {
            faction.units.push(unit);
          }
        });
      });
    };
    fetchData().catch((error) => console.log(error));
  }, [setAllCards, setFaction]);

  return (
    <div>
      <h2>Mes decks</h2>
      <NavLink to={"/create-deck"}>Créer un deck</NavLink>

      <DeckList />
    </div>
  );
};

export default DecksPage;
