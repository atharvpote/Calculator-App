import reset from "./reset";
import { lastStateInvalidOrInfinity, removeLastChar, lastChar } from "./utils";

export function handleDel(state, action) {
  // Reset if last calculation was invalid
  if (lastStateInvalidOrInfinity(state)) return reset(state, action);

  // If there is no first input return same state
  if (state.firstInput) return state;

  let newState = {
    ...state,
    lastAction: action.type,
    current: removeLastChar(state.current),
  };

  // If last char in string is decimal delete it and turn of hasDecimal flag
  if (lastChar(state.current) === ".")
    newState = {
      ...newState,
      hasDecimal: false,
    };

  // If string is empty after removing last char replace it with "0"
  if (newState.current.length == 0) newState = { ...newState, current: "0" };

  return newState;
}
