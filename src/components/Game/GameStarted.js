import { collection } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../..";
import { useGameStore } from "../../contexts/GameContext";
import Board from "./Board";

export default function GameStarted() {

      //Get the game store
      // const [user] = useAuthState(auth);
      // const gameStore = useGameStore();
      // const gameRef = collection(db, "game");
      // const [game] = useCollectionData(gameRef, {
      //     snapshotListenOptions: { includeMetadataChanges: true },
      // });

      // const isReady = user && game && gameStore

      // console.log(game);
      // console.log(gameStore);
  return (
    <div style={{width:"1200px", height:"600px", border:"1px solid black"}}>
      <Board />
      {/* <h1>Game is starting !</h1>
      {isReady && <div>Deck choisi : {gameStore[user.uid].name}</div>} */}
    </div>
  );
}
