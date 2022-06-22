import { addDoc, collection } from "firebase/firestore/lite";
import { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../..";
import { DeckContext } from "../Layout/Layout";

export default function FormDeck() {
  const [deckName, setDeckName] = useState("");
  const { cards, faction } = useContext(DeckContext);

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSaveDeck = async () => {
    const cardsToSave = cards.filter((card) => {
      return card.count > 0;
    });

    const deckToSave = {
      name: deckName,
      cards: cardsToSave,
      owner_email: user.email,
      faction,
    };

    // Save the deck
    const docRef = collection(db, "decks");
    await addDoc(docRef, deckToSave);

    navigate("/decks", { replace: true });
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
