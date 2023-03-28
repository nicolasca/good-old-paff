import styled from "styled-components";
import { useDecksDispatch } from "../../contexts/DecksContext";

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

export default function CardEditMode({ card, faction }) {
  const dispatch = useDecksDispatch();

  const handleCountChange = (e) => {
    dispatch({
      type: "addCount",
      card,
      count: e.target.value,
    });
  };

  return (
    <CardWrapper key={card.slug}>
      <img
        src={`${process.env.PUBLIC_URL}/images/${faction.slug}/${card.slug}.jpg`}
        alt={card.name}
        width={357}
        height={500}
      />
      <input
        type="number"
        min="0"
        value={card.count}
        onChange={handleCountChange}
      />
    </CardWrapper>
  );
}
