import reset from "./reset";
import { lastStateInvalidOrInfinity, calculate, toStr } from "./utils";

export function handleEquals(state, action) {
  // Reset if last calculation was invalid
  if (lastStateInvalidOrInfinity(state)) return reset(state, action);

  // If there is no first input return same state
  if (state.firstInput) return state;

  let newState = {
    ...state,
    lastAction: action.type,
    lastOperation: null,
    currentOperation: null,
  };

  // Only change other state properties if last operation is there
  if (state.lastOperation !== null) {
    const calculation = calculate(state);

    // If calculation is NaN display it is an invalid number and reset few properties
    if (Number.isNaN(calculation))
      newState = {
        ...newState,
        previous: null,
        current: "Invalid Operation",
        lastOpInvalid: true,
        hasDecimal: !Number.isInteger(calculation),
      };
    // Calculate and display the result, set decimal flag according to the result
    else
      newState = {
        ...newState,
        previous: calculation,
        current: toStr(calculation),
        hasDecimal: !Number.isInteger(calculation),
      };
  }

  return newState;
}
