import styled from "styled-components";
import CardReadMode from "../../Cards/CardReadMode";

const CardsBlock = styled.div`
  //   display: flex;
  //   flex-direction: column;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const CardContainer = styled.div`
  border: ${({ selected }) => (selected ? '2px solid red' : '1px solid black')};

  &:hover {
    cursor: pointer;
  }
`;

export default function CardListDeploy({ cards, faction, selectedCards, onSelectCard }) {
  const itemCards = () => {
    return (
      cards &&
      cards.map((card, index) =>
        <CardContainer
          key={card.slug + '_' + index}
          selected={selectedCards.has(card.gameCardId)}
          onClick={() => onSelectCard(card.gameCardId)}
        >
          <CardReadMode
            card={card}
            faction={faction}
            displayCount={false}
          />
        </CardContainer>
      )
    );
  };

  return (
    <CardsBlock>
      {faction ? <CardsWrapper>{itemCards()}</CardsWrapper> : null}
    </CardsBlock>
  );
}
