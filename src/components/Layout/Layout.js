import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styled from "styled-components";
import Cards from "../../pages/Cards";
import Home from "../../pages/Home/Home";
import Header from "./Header";
import Login from "../../pages/Authentication/Login";
import Register from "../../pages/Authentication/Register";
import Decks from "../../pages/Decks/Decks";
import ProtectedRoute from "./ProtectedRoute";
import ResetPassword from "../../pages/Authentication/ResetPassword";

const routes = (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/cards" element={<Cards />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgotten-password" element={<ResetPassword />} />

    <Route
      path="/decks"
      element={
        <ProtectedRoute>
          <Decks />
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
