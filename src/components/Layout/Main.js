import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../..";
import { useCardsDispatch } from "../../contexts/CardsContext";
import { useDecksDispatch } from "../../contexts/DecksContext";
import useFirestoreData from "../../hooks/useFirestoreData";

const MainWrapper = styled.main`
  padding: 2rem;
`;

export default function Main({ children }) {
  const cardsDispatch = useCardsDispatch();
  const decksDispatch = useDecksDispatch();

  const [user] = useAuthState(auth);

  // Factions & Cards
  const factionList = useFirestoreData("factions");
  const cardList = useFirestoreData("units");

  useEffect(() => {
    if (factionList && cardList) {
      cardsDispatch({
        type: "setCardsByFaction",
        cards: cardList,
        factions: factionList,
      });
    }
  }, [cardsDispatch, factionList, cardList]);

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
    if (user && user.email) {
      fetchData();
    }
  }, [decksDispatch, user]);

  return <MainWrapper>{children}</MainWrapper>;
}
