import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../..";
import { useCardsDispatch } from "../../contexts/CardsContext";
import { useDecksDispatch } from "../../contexts/DecksContext";

const MainWrapper = styled.main`
  padding: 2rem;
`;

export default function Main({ children }) {
  const cardsDispatch = useCardsDispatch();
  const decksDispatch = useDecksDispatch();

  const [user] = useAuthState(auth);

  // Get the factions and cards
  useEffect(() => {
    const fetchData = async () => {
      // Factions
      const factionsCol = collection(db, "factions");
      const q = query(factionsCol, orderBy("name"));
      const factionsSnapshot = await getDocs(q);
      const factionList = factionsSnapshot.docs.map((doc) => doc.data());

      // Cards
      const cardsCol = collection(db, "units");
      const cardsSnapshot = await getDocs(cardsCol);
      const unitList = cardsSnapshot.docs.map((doc) => doc.data());
      cardsDispatch({
        type: "setCardsByFaction",
        cards: unitList,
        factions: factionList,
      });
    };
    fetchData().catch((error) => console.log(error));
  }, [cardsDispatch]);

  // Get the decks hen the user is authenticated
  useEffect(() => {
    const fetchData = async () => {
      const deckRef = collection(db, "decks");
      const q = query(deckRef, where("owner_email", "==", user.email));
      const decksSnapshot = await getDocs(q);
      const deckList = decksSnapshot.docs.map((doc) =>
        Object.assign({ id: doc.id }, doc.data())
      );
      decksDispatch({
        type: "initDecks",
        decks: deckList,
      });
    };
    fetchData();
  }, [decksDispatch, user]);

  return <MainWrapper>{children}</MainWrapper>;
}
