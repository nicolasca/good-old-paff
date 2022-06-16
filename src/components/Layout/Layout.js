import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styled from "styled-components";
import Cards from "../../pages/Cards";
import Home from "../../pages/Home";
import Header from "./Header";

const routes = (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/cards" element={<Cards />} />
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
