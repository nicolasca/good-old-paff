import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { DeckContext } from "../Layout/Layout";

const CardWrapper = styled.div`
  transition: transform 1s;
  &:hover {
    transform: rotate3d(0, 1, 0, 10deg);
  }
`;

export default function CardEditMode({ card, faction }) {
  const { addCount } = useContext(DeckContext);
  const [count, setCount] = useState(0);

  const handleCountChange = (e) => {
    addCount(card, parseInt(e.target.value));
    setCount(e.target.value);
  };

  useEffect(() => {
    setCount(card.count || 0);
  }, [card]);

  return (
    <CardWrapper key={card.slug}>
      <img
        src={`${process.env.PUBLIC_URL}/images/${faction.slug}/${card.slug}.jpg`}
        alt={card.name}
        width={357}
        height={500}
      />
      <input type="number" value={count} onChange={handleCountChange} />
    </CardWrapper>
  );
}
