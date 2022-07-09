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
  lastOperation: null,
  operationTriggered: false,
  hasDecimal: false,
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
  if (state.previous !== null && !Number.isFinite(state.previous))
    return reset(state, action);

  let newState = { ...state, lastAction: action.type };

  if (state.current === "0")
    newState = { ...newState, current: action.payload.value };
  else if (state.operationTriggered)
    newState = {
      ...newState,
      current: action.payload.value,
      operationTriggered: false,
      hasDecimal: false,
    };
  else if (isValidNumber(state.current + action.payload.value))
    newState = { ...newState, current: state.current + action.payload.value };

  console.log(newState);

  return newState;
}

function handleDel(state, action) {
  if (state.previous !== null && !Number.isFinite(state.previous))
    return reset(state, action);

  let newState = {
    ...state,
    lastAction: action.type,
  };

  if (lastChar(state.current) === ".")
    newState = {
      ...newState,
      current: removeLastChar(state.current),
      hasDecimal: false,
    };
  else
    newState = {
      ...newState,
      current: removeLastChar(state.current),
    };

  if (newState.current.length == 0) newState = { ...newState, current: "0" };

  console.log(newState);

  return newState;
}

function handleDecimal(state, action) {
  if (state.previous !== null && !Number.isFinite(state.previous))
    return reset(state, action);

  let newState = {
    ...state,
    lastAction: action.type,
  };

  if (state.operationTriggered)
    newState = {
      ...newState,
      current: "0.",
      hasDecimal: true,
      operationTriggered: false,
    };
  else if (!state.hasDecimal)
    newState = {
      ...newState,
      lastAction: action.type,
      current: state.current + ".",
      hasDecimal: true,
    };

  console.log(newState);

  return newState;
}

function handleOperation(state, action) {
  if (state.previous !== null && !Number.isFinite(state.previous))
    return reset(state, action);

  let newState = {
    ...state,
    lastAction: action.type,
  };

  if (state.previous === null || state.lastOperation === null)
    newState = {
      ...newState,
      lastOperation: action.type,
      operationTriggered: true,
      previous: toNum(state.current),
    };
  else
    newState = {
      ...newState,
      lastOperation: action.type,
      operationTriggered: true,
      previous: handleLastOperation(state),
    };

  console.log(newState);

  return newState;
}

function handleEquals(state, action) {
  if (state.previous !== null && !Number.isFinite(state.previous))
    return reset(state, action);

  let newState = { ...state, lastAction: action.type };

  if (state.lastOperation !== null) {
    const calculation = handleLastOperation(state);

    newState = {
      ...newState,
      previous: calculation,
      current: toStr(calculation),
      lastOperation: null,
      hasDecimal: !Number.isInteger(calculation),
    };
  }

  console.log(newState);

  return newState;
}

function reset(state, action) {
  const newState = {
    ...initialState,
    theme: state.theme,
    lastAction: action.type,
  };

  console.log(newState);

  return newState;
}

function handleLastOperation(state) {
  let result;

  if (state.lastOperation === "ADD")
    result = add(state.previous, state.current);

  if (state.lastOperation === "SUB")
    result = sub(state.previous, state.current);

  if (state.lastOperation === "MULTIPLY")
    result = multiply(state.previous, state.current);

  if (state.lastOperation === "DIVIDE")
    result = divide(state.previous, state.current);

  return result;
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
  return Number.parseFloat(num.toFixed(5)).toString();
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
