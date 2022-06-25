import styled from "styled-components";

const CardWrapper = styled.div`
  transition: transform 1s;
  &:hover {
    transform: rotate3d(0, 1, 0, 10deg);
  }
`;

export default function CardReadMode({ card, faction }) {
  return (
    <CardWrapper key={card.slug}>
      <img
        src={`${process.env.PUBLIC_URL}/images/${faction.slug}/${card.slug}.jpg`}
        alt={card.name}
        width={357}
        height={500}
      />
      {card["count"] ? <span>{card.count}</span> : null}
    </CardWrapper>
  );
}
