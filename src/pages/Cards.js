import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "..";
import { factionsData, unitsData } from "../import";

const CardsBlock = styled.div`
  //   display: flex;
  //   flex-direction: column;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const Card = styled.div`
  transition: transform 1s;
  &:hover {
    transform: rotate3d(0, 1, 0, 10deg);
  }
`;

export default function Cards() {
  const [factions, setFactions] = useState(null);
  const [selectedFaction, setSelectedFaction] = useState(null);
  const [factionsOptions, setFactionsOptions] = useState(null);
  const [cards, setCards] = useState(null);

  const getItemsCards = async (faction) => {
    // Cards
    const cardsCol = collection(db, "units");
    const q = query(cardsCol, where("faction_id", "==", faction.id));
    const cardsSnapshot = await getDocs(q);
    const cardList = cardsSnapshot.docs.map((doc) => doc.data());

    const items = createItemCards(cardList);
    setCards(items);
  };

  const createItemCards = useCallback(
    (faction, units) => {
      return units.map((card) => {
        return (
          <Card key={card.slug}>
            <img
              src={`${process.env.PUBLIC_URL}/images/${faction.slug}/${card.slug}.jpg`}
              alt={card.name}
              width={357}
              height={500}
            />
          </Card>
        );
      });
    },
    [factions]
  );

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

  const handleChangeFaction = (event) => {
    const faction = factions.find(
      (faction) => event.target.value === faction.slug
    );
    setSelectedFaction(faction);

    const units = unitsData.filter((unit) => unit.faction_id === faction.id);

    setCards(createItemCards(faction, units));
  };

  useEffect(() => {
    const faction = factionsData[0];
    setFactions(factionsData);
    setSelectedFaction(faction);
    const units = unitsData.filter((unit) => unit.faction_id === faction.id);
    setCards(createItemCards(faction, units));
  }, [createItemCards]);

  //   useEffect(() => {
  //     const getFactions = async () => {
  //       // Factions
  //       const factionsCol = collection(db, "factions");
  //       const factionsSnapshot = await getDocs(factionsCol);
  //       const factionList = factionsSnapshot.docs.map((doc) => doc.data());

  //       getItemsCards(factionList[1]);
  //       setFaction(factionList[1]);
  //     };

  //     getFactions();
  //   }, []);

  return (
    <CardsBlock>
      {factions && factions.length > 0 ? (
        <select onChange={handleChangeFaction}>{factionsOptions}</select>
      ) : null}
      {selectedFaction ? (
        <>
          <CardsWrapper>{cards}</CardsWrapper>
        </>
      ) : null}
    </CardsBlock>
  );
}
