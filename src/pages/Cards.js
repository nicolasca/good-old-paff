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
  const [units, setUnits] = useState(null);
  const [selectedFaction, setSelectedFaction] = useState(null);
  const [factionsOptions, setFactionsOptions] = useState(null);
  const [cards, setCards] = useState(null);

  const createItemCards = useCallback(
    (faction) => {
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
    [units]
  );

  const getItemsCards = useCallback(
    async (faction) => {
      const items = createItemCards(faction);
      setCards(items);
    },
    [createItemCards]
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
    console.log(units);
    const selectedUnits = units.filter(
      (unit) => unit.faction_id === faction.id
    );

    setCards(createItemCards(faction, selectedUnits));
  };

  //   useEffect(() => {
  //     const faction = factionsData[0];
  //     setFactions(factionsData);
  //     setSelectedFaction(faction);
  //     const units = unitsData.filter((unit) => unit.faction_id === faction.id);
  //     setCards(createItemCards(faction, units));
  //   }, [createItemCards]);

  useEffect(() => {
    const fetchData = async () => {
      // Factions
      const factionsCol = collection(db, "factions");
      const factionsSnapshot = await getDocs(factionsCol);
      const factionList = factionsSnapshot.docs.map((doc) => doc.data());

      const selectedFaction = factionList[0];
      setFactions(factionList);
      setSelectedFaction(selectedFaction);
      console.log(factionList);

      // Cards
      const cardsCol = collection(db, "units");
      //   const q = query(cardsCol, where("faction_id", "==", faction.id));
      const cardsSnapshot = await getDocs(cardsCol);
      const cardList = cardsSnapshot.docs.map((doc) => doc.data());
      setUnits(cardList);

      //   getItemsCards(selectedFaction);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

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
