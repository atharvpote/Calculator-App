import { useContext } from "react";
import styled, { css } from "styled-components";
import { fontFamily, fontWeight, typeScale } from "../utils";
import { StateContext } from "../stateManagement";

export function Keypad() {
  const { state, dispatch } = useContext(StateContext);

  const numPress = (e) =>
    dispatch({
      type: "NUM_PRESS",
      payload: { value: e.target.value },
    });
  const del = () => dispatch({ type: "DEL" });
  const reset = () => dispatch({ type: "RESET" });
  const decimal = () => dispatch({ type: "DECIMAL" });
  const add = () => dispatch({ type: "ADD" });
  const sub = () => dispatch({ type: "SUB" });
  const multiply = () => dispatch({ type: "MULTIPLY" });
  const divide = () => dispatch({ type: "DIVIDE" });
  const equals = () => dispatch({ type: "EQUALS" });

  return (
    <StyledKeypad>
      <Button value={7} onClick={numPress}>
        7
      </Button>
      <Button value={8} onClick={numPress}>
        8
      </Button>
      <Button value={9} onClick={numPress}>
        9
      </Button>
      <Del onClick={del}>DEL</Del>
      <Button value={4} onClick={numPress}>
        4
      </Button>
      <Button value={5} onClick={numPress}>
        5
      </Button>
      <Button value={6} onClick={numPress}>
        6
      </Button>
      <Button onClick={add} active={state.currentOperation === "ADD"}>
        +
      </Button>
      <Button value={1} onClick={numPress}>
        1
      </Button>
      <Button value={2} onClick={numPress}>
        2
      </Button>
      <Button value={3} onClick={numPress}>
        3
      </Button>
      <Button onClick={sub} active={state.currentOperation === "SUB"}>
        -
      </Button>
      <Button onClick={decimal} active={state.hasDecimal}>
        .
      </Button>
      <Button value={0} onClick={numPress}>
        0
      </Button>
      <Button onClick={divide} active={state.currentOperation === "DIVIDE"}>
        /
      </Button>
      <Button onClick={multiply} active={state.currentOperation === "MULTIPLY"}>
        x
      </Button>
      <Reset onClick={reset}>RESET</Reset>
      <Equals onClick={equals}> =</Equals>
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
  transition: all 0.5s;
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
