import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, db } from "../..";
import CardList from "../Cards/CardList";

export default function DeckList() {
  const [deckList, setDeckList] = useState(null);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [decksOptions, setDecksOptions] = useState(null);

  const [user] = useAuthState(auth);

  const handleDeckChange = (e) => {
    const newDeckSelected = deckList.find((d) => d.name === e.target.value);
    setSelectedDeck(newDeckSelected);
  };

  const handleDeleteDeck = async () => {
    await deleteDoc(doc(db, "decks", selectedDeck.id));
    const newDeckList = deckList.filter((d) => d.id !== selectedDeck.id);
    setDeckList(newDeckList);
    if (newDeckList.length > 0) {
      setSelectedDeck(newDeckList[0]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const deckRef = collection(db, "decks");
      const q = query(deckRef, where("owner_email", "==", user.email));
      const decksSnapshot = await getDocs(q);
      const deckList = decksSnapshot.docs.map((doc) =>
        Object.assign({ id: doc.id }, doc.data())
      );
      setDeckList(deckList);
      setSelectedDeck(deckList[0]);
    };
    fetchData();
  }, [user.email]);

  useEffect(() => {
    if (deckList) {
      const options = deckList.map((deck) => {
        return (
          <option key={deck.name} value={deck.name}>
            {deck.name}
          </option>
        );
      });
      setDecksOptions(options);
    }
  }, [deckList]);

  return (
    <div>
      {deckList && deckList.length > 0 ? (
        <>
          <select onChange={handleDeckChange}>{decksOptions}</select>
          <Link to={"/edit-deck/" + selectedDeck.id}>Modifier le deck</Link>
          <button onClick={handleDeleteDeck}>Supprimer le deck</button>
          <CardList cards={selectedDeck.cards} faction={selectedDeck.faction} />
        </>
      ) : null}
    </div>
  );
}
