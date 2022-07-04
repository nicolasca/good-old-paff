import { useEffect, useState } from "react";
import styled from "styled-components";
import { useCards } from "../../contexts/CardsContext";
import Select from "../../ui/Select/select";
import CardList from "./CardList";

const SelectWrapper = styled.div`
  margin-bottom: 2rem;
`;

export default function CardsPage() {
  const [selectedFaction, setSelectedFaction] = useState(null);
  const cardsByFactions = useCards();

  const factionsOptions =
    cardsByFactions &&
    cardsByFactions.map((faction) => {
      return (
        <option key={faction.id} value={faction.slug}>
          {faction.name}
        </option>
      );
    });

  useEffect(() => {
    setSelectedFaction(cardsByFactions[0]);
  }, [cardsByFactions]);

  const handleChangeFaction = (event) => {
    const selectedFaction = cardsByFactions.find(
      (faction) => event.target.value === faction.slug
    );
    setSelectedFaction(selectedFaction);
  };

  return (
    <div>
      {cardsByFactions && cardsByFactions.length > 0 && selectedFaction ? (
        <SelectWrapper>
          <Select value={selectedFaction.slug} onChange={handleChangeFaction}>
            {factionsOptions}
          </Select>
        </SelectWrapper>
      ) : null}
      {selectedFaction ? (
        <CardList cards={selectedFaction.cards} faction={selectedFaction} />
      ) : null}
    </div>
  );
}
