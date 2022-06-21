import { useContext, useState } from "react";
import styled from "styled-components";
import { DeckContext } from "../Decks/CreateDeck";

const CardWrapper = styled.div`
  transition: transform 1s;
  &:hover {
    transform: rotate3d(0, 1, 0, 10deg);
  }
`;

export default function Card({ card, faction, isDeckCreating = false }) {
  const [count, setCount] = useState(0);

  const deck = useContext(DeckContext);

  const handleCountChange = (e) => {
    setCount(e.target.value);
    deck.deck[card.slug] = e.target.value;
  };

  return (
    <CardWrapper key={card.slug}>
      <img
        src={`${process.env.PUBLIC_URL}/images/${faction.slug}/${card.slug}.jpg`}
        alt={card.name}
        width={357}
        height={500}
      />
      {isDeckCreating ? (
        <input type="number" value={count} onChange={handleCountChange} />
      ) : null}
    </CardWrapper>
  );
}
