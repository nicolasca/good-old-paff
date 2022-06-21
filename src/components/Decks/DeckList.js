import { collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { db } from "../..";

export default function DeckList() {
  const [deckList, setDeckList] = useState(null);
  const [decksOptions, setDecksOptions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const deckRef = collection(db, "decks");
      const deckSnapshot = await getDocs(deckRef);
      const deckList = deckSnapshot.docs.map((doc) => doc.data());
      setDeckList(deckList);
    };
    fetchData();
  }, []);

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
      {deckList && deckList.length > 0 ? <select>{decksOptions}</select> : null}
    </div>
  );
}
