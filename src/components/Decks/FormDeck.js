import { addDoc, collection } from "firebase/firestore/lite";
import { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../..";
import { DeckContext } from "./CreateDeck";

export default function FormDeck() {
  const [deckName, setDeckName] = useState("");

  const deck = useContext(DeckContext);
  const [user] = useAuthState(auth);

  const handleSaveDeck = () => {
    const cardsToSave = Object.keys(deck.deck)
      .map((cardSlug, count) => {
        const card = deck.cards.find((c) => c.slug === cardSlug && count > 0);
        return Array(count).fill({ ...card });
      })
      .flat();

    const deckToSave = {
      name: deckName,
      cards: cardsToSave,
      owner_email: user.email,
      faction_id: deck.factionId,
    };
    console.log("save the deck", { deckToSave });

    // Save the deck
    const docRef = collection(db, "decks");
    addDoc(docRef, deckToSave);
  };

  return (
    <div>
      <button onClick={handleSaveDeck}>Enregistrer</button>
      <div>
        <label htmlFor="deckName">Nom du deck</label>
        <input
          type="text"
          id="deckName"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
        />
      </div>
    </div>
  );
}
