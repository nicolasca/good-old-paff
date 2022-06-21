import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styled from "styled-components";
import Home from "../Home/Home";
import Header from "./Header";
import Register from "../Authentication/Register";
import Login from "../Authentication/Login";
import ProtectedRoute from "./ProtectedRoute";
import ResetPassword from "../Authentication/ResetPassword";
import CreateDeck from "../Decks/CreateDeck";
import CardList from "../Cards/CardList";
import DecksPage from "../Decks/DecksPage";

const routes = (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/cards" element={<CardList />} />
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
  </Routes>
);

const Main = styled.main`
  padding: 2rem;
`;

function Layout(props) {
  return (
    <Router>
      <Header />
      <Main>{routes}</Main>
    </Router>
  );
}

export default Layout;
