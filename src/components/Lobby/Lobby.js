import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../..";

export default function Lobby() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [userInLobby, setUserInLobby] = useState(false);

  const lobbyRef = collection(db, "lobby");
  const [lobby, loading, error] = useCollectionData(lobbyRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  // When the component is unmounted, leave the lobby
  useEffect(() => {
    return () => {
      deleteDoc(doc(db, "lobby", user.uid));
    };
  }, [user.uid]);

  // Same when the tab is closed
  useEffect(() => {
    const handleTabClose = () => {
      deleteDoc(doc(db, "lobby", user.uid));
    };
    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [user.uid]);

  const checkLobbyIsFull = useCallback(() => {
    const twoPlayers = lobby.length === 2;
    let playersReady = !lobby.some((p) => p.isReady === false);
    const isFull = twoPlayers && playersReady;

    if (isFull) {
      navigate("/game", { replace: true });
    }
  }, [lobby, navigate]);

  useEffect(() => {
    const player = lobby && lobby.find((p) => p.email === user.email);
    if (player) {
      setUserInLobby(player);
    } else {
      setUserInLobby(null);
    }

    if (lobby) {
      checkLobbyIsFull();
    }
  }, [lobby, user.email, checkLobbyIsFull]);

  const joinLobby = async () => {
    await setDoc(doc(db, "lobby", user.uid), {
      email: user.email,
      displayName: user.displayName,
      isReady: false,
    });
  };

  const changeReadiness = async (newReadiness) => {
    await setDoc(
      doc(db, "lobby", user.uid),
      {
        isReady: newReadiness,
      },
      { merge: true }
    );
  };

  const leaveLobby = async () => {
    await deleteDoc(doc(db, "lobby", user.uid));
  };

  return (
    <div>
      <h1>Lobby</h1>

      {lobby && (
        <div>
          {lobby.map((player) => {
            return (
              <article key={player.email}>
                <p>
                  {player.displayName} - {player.isReady ? "Prêt" : "Pas prêt"}
                </p>
              </article>
            );
          })}
        </div>
      )}
      <div>
        {userInLobby ? (
          <>
            <button onClick={leaveLobby}>Quitter</button>
            <button onClick={() => changeReadiness(!userInLobby.isReady)}>
              {" "}
              {userInLobby.isReady ? "Pas prêt" : "Prêt!"}{" "}
            </button>
          </>
        ) : (
          <button onClick={joinLobby}>Rejoindre</button>
        )}
      </div>
    </div>
  );
}
