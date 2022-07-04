import { NavLink } from "react-router-dom";
import DeckList from "./DeckList";

const DecksPage = () => {
  return (
    <div>
      <h2>Mes decks</h2>
      <NavLink to={"/create-deck"}>Créer un deck</NavLink>

      <DeckList />
    </div>
  );
};

export default DecksPage;
