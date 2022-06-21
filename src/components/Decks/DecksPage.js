import { Link } from "react-router-dom";
import DeckList from "./DeckList";

const DecksPage = () => {
  return (
    <div>
      <h2>Mes decks</h2>
      <Link to={"/create-deck"}>Créer un deck</Link>
      <DeckList />
    </div>
  );
};

export default DecksPage;
