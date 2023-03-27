import { useEffect, useState } from "react";
import Select from "../../ui/Select/select";
import CardList from "../Cards/CardList";


export default function SelectDecks({decks, onChange}) {
    const [selectedDeck, setSelectedDeck] = useState(null);

    useEffect(() => {
      setSelectedDeck(decks[0]);
    }, [decks]);
  
    const handleDeckChange = (e) => {
      const newDeckSelected = decks.find((d) => d.name === e.target.value);
      setSelectedDeck(newDeckSelected);
    };

    const decksOptions =
      decks &&
      decks.map((deck) => {
        return (
          <option key={deck.name} value={deck.name}>
            {deck.name}
          </option>
        );
      });
  
    return (
      <div>
        {decks && selectedDeck && decks.length > 0 ? (
          <>
            <Select value={selectedDeck.name} onChange={handleDeckChange}>
              {decksOptions}
            </Select>
            <CardList cards={selectedDeck.cards} faction={selectedDeck.faction} />
          </>
        ) : null}
      </div>
    );
}