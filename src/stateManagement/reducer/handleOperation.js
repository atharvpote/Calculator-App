import { reset } from "./reset";
import {
  lastStateInvalidOrInfinity,
  lastActionIsAnOperation,
  toNum,
  toStr,
  calculate,
} from "./utils";

export function handleOperation(state, action) {
  // Reset if last calculation was invalid
  if (lastStateInvalidOrInfinity(state)) return reset(state, action);

  // If there is no first input return same state
  if (state.firstInput) return state;
  let newState = {
    ...state,
    lastAction: action.payload.type,
    lastOperation: action.payload.type,
    operationTriggered: true,
    currentOperation: action.payload.type,
  };

  // Only trigger when last keypress was not operation selection
  if (!lastActionIsAnOperation(state))
    if (state.previous === null || state.lastOperation === null)
      // If there is no lastOperation or previous value, covert current number string to number and store it in state.previous
      newState = {
        ...newState,
        previous: toNum(state.current),
      };
    // Calculate the last operation, store the result in both state.previous and state.current
    else {
      const calculation = calculate(state);

      newState = {
        ...newState,
        previous: calculation,
        current: toStr(calculation),
      };
    }

  return newState;
}
