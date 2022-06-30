import { useEffect, useState } from "react";
import { useCards } from "../../contexts/CardsContext";
import CardList from "./CardList";

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
      {cardsByFactions && cardsByFactions.length > 0 ? (
        <select onChange={handleChangeFaction}>{factionsOptions}</select>
      ) : null}
      {selectedFaction ? (
        <CardList cards={selectedFaction.cards} faction={selectedFaction} />
      ) : null}
    </div>
  );
}
