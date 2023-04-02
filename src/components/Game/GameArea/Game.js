import { GizmoHelper, GizmoViewport, Html, MapControls, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { collection } from "firebase/firestore";
import { Leva } from "leva";
import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../../..";
import { useGameStore } from "../../../contexts/GameContext";
import { gameData } from "../../../fixtures/game";
import { Battleground } from "../Battleground/Battleground";
import Board from "../Board";
import CardInGame from "../CardInGame/CardInGame";
import GameInformation from "../GameInformation/GameInformation";
import styles from "./GameArea.module.css";
// import { CardInGame } from "./CardInGame_3D";

export default function Game() {

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

  // Fixtures
  const userUid = "yaG6Dx0JohaEn50fnaCyupuci3y2"
  const displayName = "nicolas"
  const {init, hands,squares, decks, player1, player2} = useGameStore();

  const gameFromFixture = gameData;

useEffect(() => {
  init(gameFromFixture);
}, [gameFromFixture, init]);


  const hand = hands[userUid];
  const deck = decks[userUid];

  // In the store there is player1 and player2. Get the one with the same uid
  const currentPlayer = player1?.displayName === displayName ? player1 : player2;
  // Get the other player
  const otherPlayer = player1?.displayName !== displayName ? player1 : player2;

  // Get the player hand
  const playerHand = hands[userUid];
  // Get the other player hand. Hands has the user uid as key
  const otherPlayerHand = hands[Object.keys(hands).filter((key) => key !== userUid)[0]];


  const cardsHand = playerHand?.map((card, index) => {
    return (
      <div className={styles.Card} key={index}>
        <CardInGame unit={card} playerID={userUid}></CardInGame>
      </div>
    );
  });

  const cardsOtherHand = otherPlayerHand?.map((card, index) => {
    return <div className={styles.HiddenCard} key={index}></div>;
  });

  return (
    <div className={styles.ScreenGame}>

      <DndProvider backend={HTML5Backend}>
        {/* Both top and bottom hands displayed during the deployment phase */}

        <div className={`${styles.Hand} ${styles.HandTop}`}>
          {cardsOtherHand}
        </div>

        <div className={`${styles.Hand} ${styles.HandBottom}`}>
          {cardsHand}
        </div>

    {
      player1 &&

        <div className={styles.GameInformationContainer}>
          <GameInformation
            player1={player1}
            player2={player2}
            decks={decks}
            playerUid={userUid}
          ></GameInformation>
        </div>
    }

        <div className={styles.BattlegroundContainer}>
          <Battleground squares={squares} userUid={userUid} />
        </div>

      </DndProvider>
    </div>
  );
}
