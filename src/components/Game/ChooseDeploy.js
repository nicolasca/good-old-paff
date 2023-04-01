import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../..";
import { useGameStore } from "../../contexts/GameContext";
import CardList from "../Cards/CardList";

export default function ChooseDeploy() {

    const navigate = useNavigate();
    const { gameId } = useParams()

    console.log(gameId)


    //Get the game store
    const [user] = useAuthState(auth);
    const gameStore = useGameStore();
    const gameRef = doc(db, "game", gameId);
    const [game] = useDocumentData(gameRef, {
        snapshotListenOptions: { includeMetadataChanges: false },
    });

    console.log(game)

    const deck = gameStore.decks[user.uid];


    const getHandFromDeck = (deck) => {
        const hand = []
        deck.cards.forEach((card, i) => {
            for (let number = 0; number < card.count; number++) {
              const cardCopy = { ...card.carte };
              let carteGameId = `${i}-${number}`;
              cardCopy["gameCardId"] = carteGameId;
              hand.push(cardCopy);
            }
          });
        return hand;
    }


    const handleValidateDeploy = () => {
        const hand = getHandFromDeck();
        gameStore.setDeck(deck, user.uid);
        updateDoc(game, {
            
        });
    }

    const checkBothPlayersValidated = useCallback(() => {
        const twoPlayers = game.length === 2;
        let playersReady = !game.some((p) => p.isReady === false);
        const isFull = twoPlayers && playersReady;

        if (isFull) {
            navigate("/game", { replace: true });
        }
    }, [game, navigate]);

    useEffect(() => {
        // const player = game && game.find((p) => p.uid === user.uid);

        if (game) {
            checkBothPlayersValidated();
        }
    }, [game, checkBothPlayersValidated]);

    return (
        <>
            <div> Choisir ses unités à déployer</div>
            {user && gameStore && gameStore.decks[user.uid] && 
                <CardList cards={deck.cards} faction={deck.faction} />
            }
            <button onClick={handleValidateDeploy}>Valider</button>
        </>
    )
}
