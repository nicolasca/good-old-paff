import React from "react";
import ReserveButton from "../Reserve/ReserveButton";
import BlackHole from "./BlackHole/BlackHole";
import styles from "./GameInformation.module.css";

function GameInformation({
  player1,
  player2,
  playerUid,
  decks,
}) {

  const PLAYER_ID=1;

  return (
    <div className={styles.GameInformation}>
      <div className={styles.Players}>
        <Player
          playerName={player1.name}
          playerNumber={0}
          factionName={decks[playerUid].faction.name}
        ></Player>

        <Player
          playerName={player2.name}
          playerNumber={1}
          factionName={decks[playerUid].faction.name}
        ></Player>
      </div>

      {PLAYER_ID ? (
        <>
         
            <>
              <div className={styles.BlackHoleReserve}>
                <BlackHole
                  removeCardFromBoard={item => console.log(item)}
                ></BlackHole>
                <div></div>

                  <ReserveButton
                    onClickReserve={() => console.log("reserve")}
                  ></ReserveButton>
              </div>

              <div className={styles.CommanderTable}>
                <table className="table is-striped">
                  <thead>
                    <tr>
                      <th>PC</th>
                      <th>Ordres</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mouvement</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Défense (-1 Att, pas de tir, +1 Def Tir et Cac)</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Assaut (+1 Att, -1 Def Tir et Cac)</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Tir</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Tir Artillerie</td>
                    </tr>
                    <tr>
                      <td>*</td>
                      <td>Renforts, * points de recrutement</td>
                    </tr>
                    <tr>
                      <td>**</td>
                      <td>Ordre de faction (** varie selon la faction)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
        </>
      ) : null}
    </div>
  );
}

export default GameInformation;

export const Player = ({
  playerName,
  factionName,
  moves,
  playerNumber
}) => {

  return (
    <div className={styles.Player}>
      <h2>{"J" + (playerNumber + 1)}</h2>
      <h4>
        {playerName} - {factionName}
      </h4>

    </div>
  );
};
