import styled from "styled-components";

const CardWrapper = styled.div`
  max-width 300px;
  transition: transform 1s;
  &:hover {
    transform: rotate3d(0, 1, 0, 10deg);
  }

  box-shadow:  var(--shadow-elevation-medium);

  img {
    object-fit: contain;
  }
`;

export default function CardReadMode({ card, faction }) {
  return (
    <CardWrapper key={card.slug}>
      <img
        src={`${process.env.PUBLIC_URL}/images/${faction.slug}/${card.slug}.jpg`}
        alt={card.name}
        width={300}
        height={420}
      />
      {card["count"] ? <span>{card.count}</span> : null}
    </CardWrapper>
  );
}
