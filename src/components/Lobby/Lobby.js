import { useFirestore, useFirestoreCollectionData } from "reactfire";

export default function Lobby() {
  //   const lobbyCollection = useFirestore().collection("lobby");
  //   const lobby = useFirestoreCollectionData(lobbyCollection);

  return (
    <div>
      <h1>Lobby</h1>
      {/* <div>
        {lobby.map((player) => {
          return (
            <article key={player.email}>
              <p>
                {player.displayName} - {player.ready ? "Prêt" : "Pas prêt"}
              </p>
            </article>
          );
        })}
      </div> */}
    </div>
  );
}
