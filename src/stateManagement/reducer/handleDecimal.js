import initialState from "../initialState";
import { lastStateInvalidOrInfinity } from "./utils";

export function handleDecimal(state, action) {
  let newState = {
    ...state,
    lastAction: action.type,
    hasDecimal: true,
    firstInput: false,
  };

  // If last calculation was invalid reset the app and input 0. Disable first input flag
  if (lastStateInvalidOrInfinity(state))
    newState = {
      ...initialState,
      theme: state.theme,
      lastAction: action.type,
      current: "0.",
      firstInput: false,
    };
  // In last input was an operation reset the display and add 0. on screen. Disable first input flag
  else if (state.operationTriggered)
    newState = {
      ...newState,
      current: "0.",
      operationTriggered: false,
      currentTriggered: false,
    };
  // Add decimal if there was not decimal already
  else if (!state.hasDecimal)
    newState = {
      ...newState,
      lastAction: action.type,
      current: state.current + ".",
    };

  return newState;
}
