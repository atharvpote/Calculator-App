import styled from "styled-components";
import { typeScale, fontFamily } from "../../utils";

export const StyledScreen = styled.div`
  display: block;
  width: 100%;
  background-color: ${({ theme }) => theme.backgrounds.screenBackground};
  color: ${({ theme }) => theme.text.screenText};
  margin-block: 2rem;
  padding: 1.5rem;
  border-radius: 10px;
  font-family: ${fontFamily};
  font-size: ${typeScale.heading2};
  text-align: right;
  overflow-wrap: break-word;
  transition: all 0.5s;
`;
