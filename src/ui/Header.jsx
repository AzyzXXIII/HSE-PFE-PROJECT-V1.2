import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentification/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 1.6rem;
  align-items: center;
  justify-content: flex-end;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

function Header() {
  return (
    <StyledHeader>
      <HeaderContainer>
        <UserAvatar />
        <HeaderMenu />
      </HeaderContainer>
    </StyledHeader>
  );
}

export default Header;
