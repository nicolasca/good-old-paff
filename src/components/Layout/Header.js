import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../..";

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  li a.active {
    color: blue;
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: 1rem;
  padding: 0;
  list-style: none;
`;

const Logout = styled.li`
  cursor: pointer;
  color: red;
`;

const logout = () => {
  signOut(auth);
};

function Header() {
  const [user] = useAuthState(auth);
  return (
    <HeaderStyled>
      <NavList>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/cards">Cartes</NavLink>
        </li>
        {user ? (
          <li>
            <NavLink to="/decks">Decks</NavLink>{" "}
          </li>
        ) : null}
      </NavList>
      <NavList>
        {user ? (
          <>
            <li>{user.displayName}</li>
            <Logout onClick={logout}>Déconnexion</Logout>
          </>
        ) : (
          <li>
            <NavLink to="/login">Connexion</NavLink>
          </li>
        )}
      </NavList>
    </HeaderStyled>
  );
}

export default Header;
