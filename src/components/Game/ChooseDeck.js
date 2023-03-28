import { collection, doc, setDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../..";
import { useDecks } from "../../contexts/DecksContext";
import { useGameStore } from "../../contexts/GameContext";
import SelectDecks from "../Decks/SelectDecks";

export default function ChooseDeck() {

    const navigate = useNavigate();

    const [selectedDeck, setSelectedDeck] = useState(null);

    //Get the game store
    const [user] = useAuthState(auth);
    const { decks } = useDecks();
    const gameStore = useGameStore();
    const gameRef = collection(db, "game");
    const [game] = useCollectionData(gameRef, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    useEffect(() => {
        setSelectedDeck(decks[0]);
    }, [decks]);

    const handleValidateDeck = () => {
        gameStore.setDeck(selectedDeck, user.uid);
        setDoc(doc(db, "game", user.uid), {
            deck: selectedDeck,
            playerUid: user.uid,
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
            <SelectDecks decks={decks} />
            <button onClick={handleValidateDeck}>Valider</button>
        </>
    )
}
