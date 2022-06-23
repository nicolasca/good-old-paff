import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../..";
import CardList from "../Cards/CardList";
import { DeckContext } from "../Layout/Layout";

export default function EditDeck() {
  const { id } = useParams();
  const [deck, setDeck] = useState(null);
  const [deckName, setDeckName] = useState("");
  const [cardsToDisplay, setCardsToDisplay] = useState(null);
  const [deckRef, setDeckRef] = useState(null);

  const { allCards, cards, setCards } = useContext(DeckContext);
  const navigate = useNavigate();

  const handleSaveDeck = async () => {
    const cardsToSave = cards.filter((card) => {
      return card.count > 0;
    });

    deck.name = deckName;
    deck.cards = cardsToSave;

    // Save the deck
    await updateDoc(deckRef, deck);
    navigate("/decks", { replace: true });
  };

  useEffect(() => {
    const getDeckDoc = async () => {
      const deckRef = doc(db, "decks", id);
      const deckSnapshot = await getDoc(deckRef);
      setDeckRef(deckRef);
      const deckToEdit = deckSnapshot.data();
      setDeck(deckToEdit);
      setDeckName(deckToEdit.name);
      setCards(deckToEdit.cards);

      // Add count to the cards
      const cardsToDisplay = [];
      allCards.forEach((card) => {
        if (deckToEdit.faction.id === card.faction_id) {
          const cardInsideDeck = deckToEdit.cards.find(
            (c) => c.slug === card.slug
          );
          if (cardInsideDeck) {
            card.count = cardInsideDeck.count;
          }
          cardsToDisplay.push(card);
        }
      });
      setCardsToDisplay(cardsToDisplay);
    };
    getDeckDoc();
  }, [id, allCards, setCards]);

  return (
    <div>
      <h2>Éditer un deck</h2>
      {deck ? (
        <div>
          <button onClick={handleSaveDeck}>Enregistrer</button>
          <span>Nom:</span>
          <input
            onChange={(e) => setDeckName(e.target.value)}
            value={deckName}
          />
          <CardList
            cards={cardsToDisplay}
            faction={deck.faction}
            isDeckCreating
          />
        </div>
      ) : null}
    </div>
  );
}
