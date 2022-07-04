import { addDoc, collection } from "firebase/firestore/lite";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../..";
import { useDecks, useDecksDispatch } from "../../contexts/DecksContext";
import Button from "../../ui/Button/Button";

export default function FormDeck() {
  const [deckName, setDeckName] = useState("");

  const { deckInEdition } = useDecks();
  const dispatch = useDecksDispatch();

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSaveDeck = async () => {
    const cardsToSave = deckInEdition.cards.filter((card) => {
      return card.count > 0;
    });

    const deckToSave = {
      ...deckInEdition,
      name: deckName,
      owner_email: user.email,
      cards: cardsToSave,
    };

    // Save the deck
    const docRef = collection(db, "decks");
    await addDoc(docRef, deckToSave);

    dispatch({
      type: "addDeck",
      deck: deckToSave,
    });

    navigate("/decks", { replace: true });
  };

  return (
    <div>
      <Button size="small" variant="outline" onClick={handleSaveDeck}>
        Enregistrer
      </Button>
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
