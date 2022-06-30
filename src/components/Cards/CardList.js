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
  const itemCards = () => {
    return (
      cards &&
      cards.map((card, index) => {
        return isDeckCreating ? (
          <CardEditMode
            key={card.slug + "_" + index}
            card={card}
            faction={faction}
          />
        ) : (
          <CardReadMode
            key={card.slug + "_" + index}
            card={card}
            faction={faction}
          />
        );
      })
    );
  };

  return (
    <CardsBlock>
      {faction ? <CardsWrapper>{itemCards()}</CardsWrapper> : null}
    </CardsBlock>
  );
}
