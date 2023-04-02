import { collection, deleteDoc, doc, onSnapshot, query, setDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../..";
import { useGameStore } from "../../contexts/GameContext";

export default function Lobby() {
  const [checkingLobby, setCheckingLobby] = useState(false);
  const [lobbies, setLobbies] = useState(false);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [userInLobby, setUserInLobby] = useState(false);
  const gameStore = useGameStore();

  useEffect(() => {
    const q = query(collection(db, "lobby"))

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const lobbies = [];
      QuerySnapshot.forEach((doc) => {
        lobbies.push({ ...doc.data(), id: doc.id });
      });
      setLobbies(lobbies);

    });
    return () => unsubscribe;

  }, [])

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

  function generateUniqueId(inputString) {
    let sum = 0;
    for (let i = 0; i < inputString.length; i++) {
      sum += inputString.charCodeAt(i);
    }
    return "" + sum;
  }


  const checkLobbyIsFull = useCallback(async () => {
    if (checkingLobby) return;
    setCheckingLobby(true);

    const twoPlayers = lobbies.length === 2;
    let playersReady = !lobbies.some((p) => p.isReady === false);
    const isFull = twoPlayers && playersReady;

    if (isFull) {
      // Add this condition to ensure only the first player creates the game document
      const names = lobbies.map(({ displayName }) => displayName);
      const gameName = `${names[0]} vs ${names[1]}`;
      const gameId = generateUniqueId(gameName);
      if (lobbies[0].email === user.email) {
        await setDoc(doc(db, "game", gameId), {
          id: gameId,
          name: gameName,
          player1: lobbies[0],
          player2: lobbies[1],
        });
        gameStore.setId(gameId);
        gameStore.setName(gameName);
      }

      // Both players navigate
      navigate("/choose-deck/" + gameId, { replace: true });
    }
    setCheckingLobby(false);
  }, [checkingLobby, lobbies, user.email, navigate, gameStore]);

  useEffect(() => {
    const player = lobbies && lobbies.find((p) => p.email === user.email);
    if (player) {
      setUserInLobby(player);
    } else {
      setUserInLobby(null);
    }

    if (lobbies) {
      checkLobbyIsFull();
    }
  }, [user.email, checkLobbyIsFull, lobbies]);

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

      {lobbies && (
        <div>
          {lobbies.map((player) => {
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
