import { collection, getDocs, orderBy, query } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "..";
// import { factionsData, unitsData } from "../import";

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

  const createItemCards = (faction) => {
    return faction.units.map((card) => {
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

  const handleChangeFaction = (event) => {
    const faction = factions.find(
      (faction) => event.target.value === faction.slug
    );
    setSelectedFaction(faction);
    setCards(createItemCards(faction));
  };

  // useEffect(() => {
  //   const factionFirst = factionsData[0];
  //   setFactions(factionsData);
  //   setSelectedFaction(factionFirst);

  //   factionsData.forEach((faction) => {
  //     faction.units = [];
  //     unitsData.forEach((unit) => {
  //       if (faction.id === unit.faction_id) {
  //         faction.units.push(unit);
  //       }
  //     });
  //   });

  //   setCards(createItemCards(factionFirst));
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Factions
      const factionsCol = collection(db, "factions");
      const q = query(factionsCol, orderBy("name"));
      const factionsSnapshot = await getDocs(q);
      const factionList = factionsSnapshot.docs.map((doc) => doc.data());

      const selectedFaction = factionList[0];
      setFactions(factionList);
      setSelectedFaction(selectedFaction);

      // Cards
      const cardsCol = collection(db, "units");
      const cardsSnapshot = await getDocs(cardsCol);
      const unitList = cardsSnapshot.docs.map((doc) => doc.data());

      factionList.forEach((faction) => {
        faction.units = [];
        unitList.forEach((unit) => {
          if (faction.id === unit.faction_id) {
            faction.units.push(unit);
          }
        });
      });

      setCards(createItemCards(selectedFaction));
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
