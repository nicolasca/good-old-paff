import { NavLink } from "react-router-dom";
import styled from "styled-components";

const HeaderStyled = styled.header`
  li a.active {
    color: blue;
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
`;

function Header() {
  return (
    <HeaderStyled>
      <NavList>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/cards">Cartes</NavLink>
        </li>
      </NavList>
    </HeaderStyled>
  );
}

export default Header;
