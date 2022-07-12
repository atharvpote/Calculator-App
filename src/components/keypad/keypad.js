import { useContext } from "react";
import { StateContext } from "../../stateManagement";
import { StyledKeypad, Button, Del, Reset, Equals } from "./keypad.styled";

export function Keypad() {
  const { state, dispatch } = useContext(StateContext);

  function numPress(e) {
    dispatch({
      type: "NUM_PRESS",
      payload: { value: e.target.value },
    });
  }
  function del() {
    dispatch({ type: "DEL" });
  }
  function reset() {
    dispatch({ type: "RESET" });
  }
  function decimal() {
    dispatch({ type: "DECIMAL" });
  }
  function add() {
    dispatch({ type: "OPERATION", payload: { type: "ADD" } });
  }
  function sub() {
    dispatch({ type: "OPERATION", payload: { type: "SUB" } });
  }
  function multiply() {
    dispatch({ type: "OPERATION", payload: { type: "MULTIPLY" } });
  }
  function divide() {
    dispatch({ type: "OPERATION", payload: { type: "DIVIDE" } });
  }
  function equals() {
    dispatch({ type: "EQUALS" });
  }

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
