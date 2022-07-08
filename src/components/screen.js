import styled from "styled-components";
import { typeScale } from "../utils";

export function Screen() {
  return <StyledScreen>399,981</StyledScreen>;
}

const StyledScreen = styled.div`
  background-color: ${({ theme }) => theme.backgrounds.screenBackground};
  margin-block: 2rem;
  padding: 1.5rem;
  border-radius: 10px;
  font-size: ${typeScale.heading2};
  text-align: right;
`;
