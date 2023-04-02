import { doc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../../..";
import CardListDeploy from "./CardListDeploy";

export default function ChooseDeploy() {

  const [game, setGame] = useState(null);
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState([]);
  const [selectedCards, setSelectedCards] = useState(new Set());


  const navigate = useNavigate();
  const { gameId } = useParams()

  //Get the game
  const [user] = useAuthState(auth);

  useEffect(() => {
    const q = query(doc(db, "game", gameId))
    const unsubscribe = onSnapshot(q, (doc) => {
        setGame(doc.data())
    });

    return () => unsubscribe;
}, [gameId])

  useEffect(() => {
    if (game?.decks && user?.uid) {
      setDeck(game.decks[user.uid]);

      // Create a list of card from the deck, flatten the cards with their count
      const cardsToDisplay = game.decks[user.uid].cards.reduce((acc, card, index) => {
        for (let i = 0; i < card.count; i++) {
          const cardCopy = { ...card };
          let cardGameId = `${index}-${i}`;
          cardCopy["faction"] = game.decks[user.uid].faction;
          cardCopy["gameCardId"] = cardGameId;
          acc.push(cardCopy);
        }
        return acc;
      }, []);
      setCards(cardsToDisplay);
    }
  }, [game?.decks, user?.uid]);


  const handleValidateDeploy = () => {
    // Remove the selecteced cards from the cards array
    const cardsToKeep = cards.filter((card) => !selectedCards.has(card.gameCardId));
   
    // Create a hand with the selectedCards. 
    const newHand = selectedCards.size > 0 ? cards.filter((card) => selectedCards.has(card.gameCardId)) : [];

    updateDoc(doc(db, "game", gameId), {
      [`hands.${user.uid}`]: newHand,
      [`cards.${user.uid}`]: cardsToKeep
    });
  }

  const checkBothPlayersValidated = useCallback(() => {
    if (! game?.hands) return;
    const twoPlayers = Object.keys(game?.hands)?.length === 2;
    const isFull = twoPlayers;

    if (isFull) {
      navigate("/game/" + gameId, { replace: true });
    }
  }, [game?.hands, gameId, navigate]);

  useEffect(() => {
    if (game?.hands) {
      checkBothPlayersValidated();
    }
  }, [game?.hands, checkBothPlayersValidated]);

  const handleCardClick = (gameCardId) => {
    setSelectedCards((prevSelectedCards) => {
      const newSelectedCards = new Set(prevSelectedCards);
      if (newSelectedCards.has(gameCardId)) {
        newSelectedCards.delete(gameCardId);
      } else {
        newSelectedCards.add(gameCardId);
      }
      return newSelectedCards;
    });
  };

  return (
    <>
      <div> Choisir ses unités à déployer</div>
      {cards && deck && 
        <CardListDeploy cards={cards} faction={deck.faction} onSelectCard={handleCardClick} selectedCards={selectedCards}/>
      }
      <button onClick={handleValidateDeploy}>Valider</button>
    </>
  )
}
