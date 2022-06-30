import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import styled from "styled-components";
import { db } from "../..";
import { useCardsDispatch } from "../../contexts/CardsContext";

const MainWrapper = styled.main`
  padding: 2rem;
`;

export default function Main({ children }) {
  const dispatch = useCardsDispatch();

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
      dispatch({
        type: "setCardsByFaction",
        cards: unitList,
        factions: factionList,
      });
    };
    fetchData().catch((error) => console.log(error));
  }, [dispatch]);

  return <MainWrapper>{children}</MainWrapper>;
}
