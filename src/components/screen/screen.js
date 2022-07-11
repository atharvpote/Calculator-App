import { useContext } from "react";
import { StateContext } from "../../stateManagement";
import { StyledScreen } from "./screen.styled";

export function Screen() {
  const { state } = useContext(StateContext);

  return <StyledScreen>{state.current}</StyledScreen>;
}
