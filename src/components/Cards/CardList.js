import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import CardReadMode from "./CardReadMode";
import CardEditMode from "./CardEditMode";
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

export default function CardList({ faction, cards, isDeckCreating }) {
  const [itemCards, setItemCards] = useState(null);

  const createItemCardsReadMode = useCallback(() => {
    return cards.map((card, index) => {
      return (
        <CardReadMode
          key={card.slug + "_" + index}
          card={card}
          faction={faction}
        />
      );
    });
  }, [cards, faction]);

  const createItemCardsEditMode = useCallback(() => {
    return cards.map((card, index) => {
      return (
        <CardEditMode
          key={card.slug + "_" + index}
          card={card}
          faction={faction}
        />
      );
    });
  }, [cards, faction]);

  useEffect(() => {
    if (faction && cards) {
      if (!isDeckCreating) {
        setItemCards(createItemCardsReadMode());
      } else {
        setItemCards(createItemCardsEditMode());
      }
    }
  }, [
    faction,
    cards,
    isDeckCreating,
    createItemCardsReadMode,
    createItemCardsEditMode,
  ]);

  return (
    <CardsBlock>
      {faction ? <CardsWrapper>{itemCards}</CardsWrapper> : null}
    </CardsBlock>
  );
}
