import initialState from "../initialState";
import { lastStateInvalidOrInfinity, isValidNumber } from "./utils";

export function handleNumPress(state, action) {
  let newState = { ...state, lastAction: action.type };

  // Reset and enter the input on screen if last calculation was invalid. Disable first input flag
  if (lastStateInvalidOrInfinity(state))
    newState = {
      ...initialState,
      theme: state.theme,
      lastAction: action.type,
      current: action.payload.value,
      firstInput: false,
    };
  // If app is in initial state replace 0
  else if (state.current === "0")
    newState = {
      ...newState,
      current: action.payload.value,
      firstInput: false,
    };
  // If last keypress was an operation replace the display text. Disable first input flag
  else if (state.operationTriggered)
    newState = {
      ...newState,
      current: action.payload.value,
      operationTriggered: false,
      currentOperation: false,
      hasDecimal: false,
    };
  // Validates if input number is in lover than MAX_SAFE_INTEGER
  else if (isValidNumber(state.current + action.payload.value))
    newState = { ...newState, current: state.current + action.payload.value };

  return newState;
}
