import { deleteDoc, doc } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../..";
import { useDecks, useDecksDispatch } from "../../contexts/DecksContext";
import Button from "../../ui/Button/Button";
import Select from "../../ui/Select/select";
import CardList from "../Cards/CardList";

export default function DeckList() {
  const [selectedDeck, setSelectedDeck] = useState(null);

  const { decks } = useDecks();
  const decksDispatch = useDecksDispatch();

  useEffect(() => {
    setSelectedDeck(decks[0]);
  }, [decks]);

  const handleDeckChange = (e) => {
    const newDeckSelected = decks.find((d) => d.name === e.target.value);
    setSelectedDeck(newDeckSelected);
  };

  const handleDeleteDeck = async () => {
    await deleteDoc(doc(db, "decks", selectedDeck.id));
    const newDeckList = decks.filter((d) => d.id !== selectedDeck.id);
    decksDispatch({
      type: "deleteDeck",
      id: selectedDeck.id,
    });
    if (newDeckList.length > 0) {
      setSelectedDeck(newDeckList[0]);
    }
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
          <button>
            <Link to={"/edit-deck/" + selectedDeck.id}>Modifier le deck</Link>
          </button>
          <Button size="small" variant="outline" onClick={handleDeleteDeck}>
            Supprimer le deck
          </Button>
          <CardList cards={selectedDeck.cards} faction={selectedDeck.faction} />
        </>
      ) : null}
    </div>
  );
}
