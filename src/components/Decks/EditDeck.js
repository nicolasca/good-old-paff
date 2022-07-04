import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../..";
import { useCards } from "../../contexts/CardsContext";
import { useDecks, useDecksDispatch } from "../../contexts/DecksContext";
import CardList from "../Cards/CardList";

export default function EditDeck() {
  const { id } = useParams();
  const [deckName, setDeckName] = useState("");
  const [deckRef, setDeckRef] = useState(null);

  const { deckInEdition } = useDecks();
  const dispatch = useDecksDispatch();
  const cardsByFaction = useCards();

  const navigate = useNavigate();

  const handleSaveDeck = async () => {
    // Remove cards with count 0
    const cardsToSave = deckInEdition.cards.filter((card) => {
      return card.count > 0;
    });

    deckInEdition.cards = cardsToSave;
    deckInEdition.name = deckName;

    dispatch({
      type: "updateAfterSave",
      deck: deckInEdition,
    });

    // Save the deck
    await updateDoc(deckRef, deckInEdition);

    navigate("/decks", { replace: true });
  };

  useEffect(() => {
    const getDeckDoc = async () => {
      const deckRef = doc(db, "decks", id);
      const deckSnapshot = await getDoc(deckRef);
      setDeckRef(deckRef);
      const deckToEdit = deckSnapshot.data();
      deckToEdit.id = deckSnapshot.id;

      setDeckName(deckToEdit.name);

      // Add cards with 0 count to the current deck in edition
      if (cardsByFaction) {
        const factionWithCards = cardsByFaction.find(
          (f) => f.id === deckToEdit.faction.id
        );
        factionWithCards.cards.forEach((card) => {
          // If not in the deck we add it with a 0 count
          if (!deckToEdit.cards.find((c) => c.slug === card.slug)) {
            deckToEdit.cards.push({ ...card, count: 0 });
          }
        });
        dispatch({
          type: "setDeckInEdition",
          deck: deckToEdit,
        });
      }
    };
    getDeckDoc();
  }, [id, dispatch, cardsByFaction]);

  return (
    <div>
      <h2>Éditer un deck</h2>
      {deckInEdition ? (
        <div>
          <button onClick={handleSaveDeck}>Enregistrer</button>
          <span>Nom:</span>
          <input
            onChange={(e) => setDeckName(e.target.value)}
            value={deckName}
          />
          <CardList
            cards={deckInEdition.cards}
            faction={deckInEdition.faction}
            isDeckCreating
          />
        </div>
      ) : null}
    </div>
  );
}
