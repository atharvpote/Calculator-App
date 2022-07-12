import styled, { css } from "styled-components";
import { fontFamily, fontWeight, typeScale } from "../../utils";

export const StyledKeypad = styled.div`
  background-color: ${({ theme }) => theme.backgrounds.keypadBackground};
  padding: 1.5rem;
  border-radius: 10px;
  display: grid;
  place-content: center;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  transition: all 0.5s;
`;

export const Button = styled.button`
  display: inline-block;
  padding-block: 1.25rem;
  width: 100%;
  border: none;
  border-radius: 5px;
  font-family: ${fontFamily};
  font-size: ${typeScale.heading2};
  font-weight: ${fontWeight};
  cursor: pointer;
  transition: box-shadow 0.125s, transform 0.125s, background-color 0.125s,
    color 0.125s;

  ${({ theme, active }) => {
    if (active)
      return css`
        box-shadow: 0 3px 0 0 ${theme.keys.operationHighlight.keyShadow};
        background-color: ${theme.keys.operationHighlight.keyBackground};
        color: ${theme.keys.operationHighlight.keyText};

        &:active {
          box-shadow: 0 0 0 0 ${theme.keys.operationHighlight.keyShadow};
          transform: translateY(3px);
        }
      `;
    else
      return css`
        box-shadow: 0 3px 0 0 ${theme.keys.normalKeys.keyShadow};
        background-color: ${theme.keys.normalKeys.keyBackground};
        color: ${theme.keys.normalKeys.keyText};

        &:active {
          box-shadow: 0 0 0 0 ${theme.keys.normalKeys.keyShadow};
          transform: translateY(3px);
        }
      `;
  }}
`;

export const Del = styled(Button)`
  background-color: ${({ theme }) => theme.keys.delAndRestKeys.keyBackground};
  color: ${({ theme }) => theme.keys.delAndRestKeys.keyText};
  box-shadow: 0 3px 0 0 ${({ theme }) => theme.keys.delAndRestKeys.keyShadow};
  font-size: ${typeScale.heading5};
  letter-spacing: 1px;
`;

export const Reset = styled(Del)`
  grid-column: span 2;
`;

export const Equals = styled(Reset)`
  background-color: ${({ theme }) => theme.keys.equalsKey.keyBackground};
  box-shadow: 0 3px 0 0 ${({ theme }) => theme.keys.equalsKey.keyShadow};
`;
