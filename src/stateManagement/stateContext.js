import { createContext, useReducer } from "react";
import { arrayOf, element } from "prop-types";
import { ThemeProvider } from "styled-components";
import { dark } from "../utils";

export const StateContext = createContext();

export function StateContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={state.theme}>{children}</ThemeProvider>
    </StateContext.Provider>
  );
}

StateContextProvider.propTypes = {
  children: arrayOf(element),
};

const initialState = {
  theme: dark,
  current: "0",
  previous: null,
  lastAction: null,
  currentOperation: null,
  lastOperation: null,
  operationTriggered: false,
  lastOpInvalid: false,
  hasDecimal: false,
  firstInput: true,
};

function reducer(state, action) {
  if (action.type === "NUM_PRESS") {
    return handleNumPress(state, action);
  }

  if (action.type === "DEL") {
    return handleDel(state, action);
  }

  if (action.type === "DECIMAL") {
    return handleDecimal(state, action);
  }

  if (action.type === "ADD") {
    return handleOperation(state, action);
  }

  if (action.type === "SUB") {
    return handleOperation(state, action);
  }

  if (action.type === "MULTIPLY") {
    return handleOperation(state, action);
  }

  if (action.type === "DIVIDE") {
    return handleOperation(state, action);
  }

  if (action.type === "EQUALS") {
    return handleEquals(state, action);
  }

  if (action.type === "RESET") {
    return reset(state, action);
  }

  return state;
}

function handleNumPress(state, action) {
  let newState = { ...state, lastAction: action.type };

  // Reset and enter the input on screen if last calculation was invalid. Disable first input flag
  if (lastOpInvalidOrInfinity(state))
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

  console.log(newState);

  return newState;
}

function handleDel(state, action) {
  // Reset if last calculation was invalid
  if (lastOpInvalidOrInfinity(state)) return reset(state, action);
  // If there is no first input return same state
  if (state.firstInput) return state;

  let newState = {
    ...state,
    lastAction: action.type,
  };
  // If last char in string is decimal delete it and turn of hasDecimal flag
  if (lastChar(state.current) === ".")
    newState = {
      ...newState,
      current: removeLastChar(state.current),
      hasDecimal: false,
    };
  // Remove last char
  else
    newState = {
      ...newState,
      current: removeLastChar(state.current),
    };
  // If string is empty after removing last char replace it with "0"
  if (newState.current.length == 0) newState = { ...newState, current: "0" };

  return newState;
}

function handleDecimal(state, action) {
  let newState = {
    ...state,
    lastAction: action.type,
  };
  // If last calculation was invalid reset the app and input 0. Disable first input flag
  if (lastOpInvalidOrInfinity(state))
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
      hasDecimal: true,
      operationTriggered: false,
      currentTriggered: false,
      firstInput: false,
    };
  // Add decimal if there was not decimal already
  else if (!state.hasDecimal)
    newState = {
      ...newState,
      lastAction: action.type,
      current: state.current + ".",
      hasDecimal: true,
      firstInput: false,
    };

  return newState;
}

function handleOperation(state, action) {
  // Reset if last calculation was invalid
  if (lastOpInvalidOrInfinity(state)) return reset(state, action);
  // If there is no first input return same state
  if (state.firstInput) return state;

  let newState = {
    ...state,
    lastAction: action.type,
    lastOperation: action.type,
    operationTriggered: true,
    currentOperation: action.type,
  };

  // Only trigger when last keypress was not operation selection
  if (!lastActionIsAnOperation(state))
    if (state.previous === null || state.lastOperation === null)
      // If there is no last operation or previous covert current number string to number and store it in state.previous
      newState = {
        ...newState,
        previous: toNum(state.current),
      };
    // Calculate the last operation, store the result in both state.previous and state.current
    else {
      const calculation = handleLastOperation(state);

      newState = {
        ...newState,
        previous: calculation,
        current: toStr(calculation),
      };
    }

  console.log(newState);

  return newState;
}

function handleEquals(state, action) {
  // Reset if last calculation was invalid
  if (lastOpInvalidOrInfinity(state)) return reset(state, action);
  // If there is no first input return same state
  if (state.firstInput) return state;

  let newState = { ...state, lastAction: action.type };
  // Only change other state properties if last operation is there
  if (state.lastOperation !== null) {
    const calculation = handleLastOperation(state);
    // If calculation is NaN display it is an invalid number and reset few properties
    if (Number.isNaN(calculation))
      newState = {
        ...newState,
        previous: null,
        current: "Invalid Operation",
        lastOpInvalid: true,
        lastOperation: null,
        currentOperation: null,
        hasDecimal: !Number.isInteger(calculation),
      };
    // Calculate and display the result, set decimal flag according to the result
    else
      newState = {
        ...newState,
        previous: calculation,
        current: toStr(calculation),
        lastOperation: null,
        currentOperation: null,
        hasDecimal: !Number.isInteger(calculation),
      };
  }

  return newState;
}

function reset(state, action) {
  if (state.firstInput) return state;

  const newState = {
    ...initialState,
    theme: state.theme,
    lastAction: action.type,
  };

  return newState;
}

function handleLastOperation(state) {
  if (state.lastOperation === "ADD") return add(state.previous, state.current);

  if (state.lastOperation === "SUB") return sub(state.previous, state.current);

  if (state.lastOperation === "MULTIPLY")
    return multiply(state.previous, state.current);

  if (state.lastOperation === "DIVIDE")
    return divide(state.previous, state.current);
}

function add(n1, n2) {
  return toNum(n1) + toNum(n2);
}

function sub(n1, n2) {
  return toNum(n1) - toNum(n2);
}

function multiply(n1, n2) {
  return toNum(n1) * toNum(n2);
}

function divide(n1, n2) {
  return toNum(n1) / toNum(n2);
}

function toNum(strNum) {
  return Number.parseFloat(strNum);
}

function toStr(num) {
  return Number.parseFloat(num.toFixed(8)).toString();
}

function lastChar(str) {
  return str[str.length - 1];
}

function removeLastChar(str) {
  return str.substring(0, str.length - 1);
}

function isValidNumber(num) {
  return Number.parseFloat(num) < Number.MAX_SAFE_INTEGER;
}

function lastOpInvalidOrInfinity(state) {
  return (
    (state.previous !== null && !Number.isFinite(state.previous)) ||
    state.lastOpInvalid
  );
}

function lastActionIsAnOperation(state) {
  return ["ADD", "SUB", "MULTIPLY", "DIVIDE"].some(
    (op) => op === state.lastAction
  );
}
