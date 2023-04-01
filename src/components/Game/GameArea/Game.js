import { GizmoHelper, GizmoViewport, Html, MapControls, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { collection } from "firebase/firestore";
import { Leva } from "leva";
import React from "react";
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
  const game = gameData;

  const hand = game.hands[userUid];

  const path = `${process.env.PUBLIC_URL}/images/elfes/sable-poison.jpg`
  console.log(path)

  const deck = game.decks[userUid];

  // In the store there is player1 and player2. Get the one with the same uid
  const currentPlayer = game.player1.uid === userUid ? game.player1 : game.player2;

  // Get the other player
  const otherPlayer = game.player1.uid !== userUid ? game.player1 : game.player2;

  // Get the player hand
  const playerHand = game.hands[userUid];

  console.log(game.hands)
  console.log(otherPlayer.uid)
  // Get the other player hand
  const otherPlayerHand = game.hands[otherPlayer.uid];


  let cardsHand = playerHand.map((card, index) => {
    return (
      <div className={styles.Card} key={index}>
        <CardInGame unit={card} playerID={userUid} ></CardInGame>
      </div>
    );
  });

  const cardsOtherHand = otherPlayerHand.map((card, index) => {
    return <div className={styles.HiddenCard} key={index}></div>;
  });

  return (
    <div className={styles.ScreenGame}>

      {/* <Leva collapsed /> */}
      {/* <Canvas camera={{ position: [0, 0, 5], zoom: 1, up: [0, 0, 1], far: 100 }}> */}
      {/* <Canvas camera={{ position: [0, 0, 15] }}>
        <MapControls makeDefault /> */}
      {/* <OrbitControls makeDefault /> */}
      {/* <GizmoHelper
          alignment="bottom-right"
          margin={[80, 80]}
        >
          <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />

        </GizmoHelper>
        <ambientLight />
       <CardInGame path={path} />
        <group>
          {cards}
        </group>
         <Board />  
        <Html position={[-4,0,0]} transform castShadow receiveShadow>
        {htmlCards}
        </Html>
      </Canvas>
        {htmlCards} */}

      <DndProvider backend={HTML5Backend}>

        {/* Both top and bottom hands displayed during the deployment phase */}
        <>
          {userUid === game.player1 ? (
            <div className={`${styles.Hand} ${styles.HandTop}`}>
              {cardsHand}
            </div>
          ) : (
            <div className={`${styles.Hand} ${styles.HandTop}`}>
              {cardsOtherHand}
            </div>
          )}

          {userUid === game.player2 ? (
            <div className={`${styles.Hand} ${styles.HandBottom}`}>
              {cardsHand}
            </div>
          ) : (
            <div className={`${styles.Hand} ${styles.HandBottom}`}>
              {cardsOtherHand}
            </div>
          )}
        </>

        <div className={styles.GameInformationContainer}>
          <GameInformation
            player1={game.player1}
            player2={game.player2}
            decks={game.decks}
            playerUid={userUid}
          ></GameInformation>
        </div>

        <div className={styles.BattlegroundContainer}>
          <Battleground game={game} />
        </div>
      </DndProvider>
    </div>
  );
}
