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

    const [hasValidated, setHasValidated] = useState(false);

    const navigate = useNavigate();
    const { gameId } = useParams()

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
        updateDoc(gameRef, {
            [`decks.${user.uid}`]: selectedDeck
        });
        setHasValidated(true);
    }

    const checkBothPlayersValidated = useCallback(() => {
        if (! game?.decks) return;
        const twoPlayers = Object.keys(game?.decks)?.length === 2;
        const isFull = twoPlayers;

        if (isFull) {
            navigate("/choose-deploy/" + gameId, { replace: true });
        }
    }, [game?.decks, gameId, navigate]);

    useEffect(() => {
        if (game?.decks) {
            checkBothPlayersValidated();
        }
    }, [game?.decks, checkBothPlayersValidated]);

    return (
        <>
            <div> Choisir son deck</div>
            {user && gameStore && gameStore.decks[user.uid] && <div>Deck choisi : {gameStore.decks[user.uid].name}</div>}
            <SelectDecks decks={decks} onChange={(deck) => setSelectedDeck(deck)}/>
            {hasValidated && 
                <button onClick={handleValidateDeck}>Valider</button>

            }
        </>
    )
}
