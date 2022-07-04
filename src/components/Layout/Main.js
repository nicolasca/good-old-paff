import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../..";
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
  const deckList = useFirestoreData("decks", user);

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
    if (deckList && user.email) {
      decksDispatch({
        type: "initDecks",
        decks: deckList,
      });
    }
  }, [decksDispatch, deckList, user]);

  return <MainWrapper>{children}</MainWrapper>;
}
