import styled from "styled-components";

const CardWrapper = styled.div`
  max-width 300px;

  img {
    object-fit: contain;
  }
`;

export default function CardReadMode({ card, faction, displayCount = true, width = 357, height = 500 }) {
  return (
    <CardWrapper key={card.slug}>
      <img
        src={`${process.env.PUBLIC_URL}/images/${faction.slug}/${card.slug}.jpg`}
        alt={card.name}
        width={width}
        height={height}
      />
      {displayCount &&  card["count"] ? <span>{card.count}</span> : null}
    </CardWrapper>
  );
}
