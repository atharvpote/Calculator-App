import styled from "styled-components";

export function Header() {
  return (
    <StyledHeader>
      <h1>calc</h1>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  margin-block: 1.5rem;
  transition: all 0.5s;
`;
