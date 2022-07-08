import styled from "styled-components";
import { fontFamily, fontWeight, typeScale } from "../utils";

export function Keypad() {
  return (
    <StyledKeypad>
      <Button>7</Button>
      <Button>8</Button>
      <Button>9</Button>
      <Del>DEL</Del>
      <Button>4</Button>
      <Button>5</Button>
      <Button>6</Button>
      <Button>+</Button>
      <Button>1</Button>
      <Button>2</Button>
      <Button>3</Button>
      <Button> -</Button>
      <Button>.</Button>
      <Button>0</Button>
      <Button>/</Button>
      <Button>x</Button>
      <Reset>RESET</Reset>
      <Equals> =</Equals>
    </StyledKeypad>
  );
}

const StyledKeypad = styled.div`
  background-color: ${({ theme }) => theme.backgrounds.keypadBackground};
  padding: 1.5rem;
  border-radius: 10px;
  display: grid;
  place-content: center;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

const Button = styled.button`
  display: inline-block;
  padding-block: 1.25rem;
  width: 100%;
  border: none;
  border-radius: 5px;
  font-family: ${fontFamily};
  font-size: ${typeScale.heading4};
  font-weight: ${fontWeight};
  box-shadow: 0 3px 0 0 ${({ theme }) => theme.keys.normalKeys.keyShadow};
  background-color: ${({ theme }) => theme.keys.normalKeys.keyBackground};
  color: ${({ theme }) => theme.keys.normalKeys.keyText};
  cursor: pointer;
  transition: box-shadow 0.25s, transform 0.25s;

  &:active {
    box-shadow: 0 0 0 0 ${({ theme }) => theme.keys.normalKeys.keyShadow};
    transform: translateY(3px);
  }
`;

const Del = styled(Button)`
  background-color: ${({ theme }) => theme.keys.delAndRestKeys.keyBackground};
  color: ${({ theme }) => theme.keys.delAndRestKeys.keyText};
  box-shadow: 0 3px 0 0 ${({ theme }) => theme.keys.delAndRestKeys.keyShadow};
  font-size: ${typeScale.heading5};
  letter-spacing: 1px;
`;

const Reset = styled(Del)`
  grid-column: span 2;
`;

const Equals = styled(Reset)`
  background-color: ${({ theme }) => theme.keys.equalsKey.keyBackground};
  box-shadow: 0 3px 0 0 ${({ theme }) => theme.keys.equalsKey.keyShadow};
`;
