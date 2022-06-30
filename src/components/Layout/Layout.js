import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styled from "styled-components";
import Home from "../Home/Home";
import Header from "./Header";
import Register from "../Authentication/Register";
import Login from "../Authentication/Login";
import ProtectedRoute from "./ProtectedRoute";
import ResetPassword from "../Authentication/ResetPassword";
import CreateDeck from "../Decks/CreateDeck";
import DecksPage from "../Decks/DecksPage";
import CardsPage from "../Cards/CardsPage";
import EditDeck from "../Decks/EditDeck";
import Lobby from "../Lobby/Lobby";
import {
  CardsProvider,
  useCardsDispatch,
} from "../../contexts/CardsContext.js";
import GameStarted from "../Game/GameStarted";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../..";
import Main from "./Main";
import { DecksProvider } from "../../contexts/DecksContext";

const routes = (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/cards" element={<CardsPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgotten-password" element={<ResetPassword />} />

    <Route
      path="/decks"
      element={
        <ProtectedRoute>
          <DecksPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/create-deck"
      element={
        <ProtectedRoute>
          <CreateDeck />
        </ProtectedRoute>
      }
    />
    <Route
      path="/edit-deck/:id"
      element={
        <ProtectedRoute>
          <EditDeck />
        </ProtectedRoute>
      }
    />
    <Route
      path="/play"
      element={
        <ProtectedRoute>
          <Lobby />
        </ProtectedRoute>
      }
    />
    <Route
      path="/game"
      element={
        <ProtectedRoute>
          <GameStarted />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export const DeckContext = React.createContext({});

function Layout(props) {
  // const [allCards, setAllCards] = useState();
  // const [cards, setCards] = useState([]);
  // const [faction, setFaction] = useState(null);

  // function addCount(card, count) {
  //   const cardFromDeck = cards.find((c) => c.slug === card.slug);
  //   if (!cardFromDeck) {
  //     cards.push({ count, ...card });
  //   } else {
  //     cardFromDeck.count = count;
  //   }
  // }

  return (
    <Router>
      <Header />
      <CardsProvider>
        <DecksProvider>
          {/* <DeckContext.Provider value={defaultValue}> */}
          <Main>{routes}</Main>
          {/* </DeckContext.Provider> */}
        </DecksProvider>
      </CardsProvider>
    </Router>
  );
}

export default Layout;
