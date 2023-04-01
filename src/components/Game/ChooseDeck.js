import { doc, updateDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../..";
import { useDecks } from "../../contexts/DecksContext";
import { useGameStore } from "../../contexts/GameContext";
import SelectDecks from "../Decks/SelectDecks";

export default function ChooseDeck() {

    const navigate = useNavigate();
    const { gameId } = useParams()

    console.log(gameId)

    const [selectedDeck, setSelectedDeck] = useState(null);

    //Get the game store
    const [user] = useAuthState(auth);
    const { decks } = useDecks();
    const gameStore = useGameStore();
    const gameRef = doc(db, "game", gameId);
    const [game] = useDocumentData(gameRef, {
        snapshotListenOptions: { includeMetadataChanges: false },
    });

    useEffect(() => {
        setSelectedDeck(decks[0]);
    }, [decks]);

    const handleValidateDeck = () => {
        gameStore.setDeck(selectedDeck, user.uid);
        updateDoc(game, {
            [`decks.${user.uid}`]: selectedDeck
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
            <div> Choisir son deck</div>
            {user && gameStore && gameStore.decks[user.uid] && <div>Deck choisi : {gameStore.decks[user.uid].name}</div>}
            <SelectDecks decks={decks} onChange={(deck) => setSelectedDeck(deck)}/>
            <button onClick={handleValidateDeck}>Valider</button>
        </>
    )
}
