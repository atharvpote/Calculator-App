import { createContext, useReducer } from "react";
import { arrayOf, element } from "prop-types";
import { ThemeProvider } from "styled-components";
import { purple } from "../utils";

export const StateContext = createContext();
export function StateContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={state.currentTheme}>{children}</ThemeProvider>
    </StateContext.Provider>
  );
}

StateContextProvider.propTypes = {
  children: arrayOf(element),
};

const initialState = {
  currentTheme: purple,
  currentValue: "0",
  previousValue: null,
  lastOperation: null,
  hasDecimal: false,
  equalsWasLastOperation: false,
};

function reducer(state, action) {
  console.log(state);
  if (action.type === "NUM_PRESS") {
    return handleNumPress(state, action);
  }

  if (action.type === "DEL") {
    return handleDel(state);
  }

  if (action.type === "DECIMAL") {
    return handleDecimal(state);
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
    return handleEquals(state);
  }

  if (action.type === "RESET") {
    return reset(state);
  }

  return state;
}

function handleNumPress(state, action) {
  if (state.previousValue !== null && !Number.isFinite(state.previousValue))
    return reset(state);

  let newState = { ...state };

  if (state.currentValue === "0" || state.equalsWasLastOperation) {
    newState = {
      ...newState,
      currentValue: String(action.payload.value),
      equalsWasLastOperation: false,
    };
  } else {
    newState = {
      ...newState,
      currentValue: String(state.currentValue + action.payload.value),
      equalsWasLastOperation: false,
    };
  }

  if (isValidNumber(newState.currentValue)) return newState;

  return state;
}

function handleDel(state) {
  if (state.previousValue !== null && !Number.isFinite(state.previousValue))
    return reset(state);

  const currentValue = state.currentValue;
  const newCurrValue = currentValue.substring(0, currentValue.length - 1);

  if (currentValue[currentValue.length - 2] === ".")
    return {
      ...state,
      currentValue: String(newCurrValue),
    };

  if (currentValue[currentValue.length - 1] === ".")
    return {
      ...state,
      currentValue: String(newCurrValue),
      hasDecimal: false,
    };

  if (!newCurrValue.length)
    return {
      ...state,
      currentValue: "0",
    };

  return {
    ...state,
    currentValue: String(newCurrValue),
  };
}

function handleDecimal(state) {
  if (state.previousValue !== null && !Number.isFinite(state.previousValue))
    return reset(state);

  if (state.equalsWasLastOperation && hasDecimal(state.currentValue))
    return state;

  if (!state.hasDecimal) {
    const newCurrValue = state.currentValue + ".";

    return {
      ...state,
      currentValue: String(newCurrValue),
      hasDecimal: true,
      equalsWasLastOperation: false,
    };
  }

  return state;
}

function handleOperation(state, action) {
  if (state.previousValue !== null && !Number.isFinite(state.previousValue))
    return reset(state);

  const newState = {
    ...state,
    lastOperation: action.type,
    previousValue: toDecimalNumber(state.currentValue),
    currentValue: "0",
    hasDecimal: false,
  };

  if (!state.previousValue) return newState;

  if (state.equalsWasLastOperation) {
    return {
      ...newState,
      equalsWasLastOperation: false,
    };
  }

  const newPrevValue = handlePreviousOperations(state);

  if (newPrevValue === undefined) throw new Error("Explosion");

  return {
    ...newState,
    previousValue: toDecimalNumber(newPrevValue),
  };
}

function handleEquals(state) {
  if (state.previousValue !== null && !Number.isFinite(state.previousValue))
    return reset(state);

  if (state.previousValue === null) return state;

  let newState = {
    ...state,
    lastOperation: null,
    equalsWasLastOperation: true,
    hasDecimal: false,
  };

  const current = state.currentValue;

  if (current[current.length - 1] === ".")
    newState = { ...newState, hasDecimal: false };

  if (state.lastOperation) {
    const newPrevAndCurrValue = handlePreviousOperations(state);

    return {
      ...newState,
      previousValue: toDecimalNumber(newPrevAndCurrValue),
      currentValue: decimalNumToStr(newPrevAndCurrValue),
    };
  }

  return { ...state, currentValue: decimalNumToStr(state.previousValue) };
}

function reset(state) {
  const currentTheme = state.currentTheme;
  return { ...initialState, currentTheme };
}

function isValidNumber(num) {
  return (
    (Number.isInteger(toDecimalNumber(num)) &&
      Number.parseInt(num) < Number.MAX_SAFE_INTEGER) ||
    toDecimalNumber(num) < Number.MAX_VALUE
  );
}

function handlePreviousOperations(state) {
  let newPrevValue;

  if (state.lastOperation === "ADD")
    newPrevValue = add(state.previousValue, state.currentValue);

  if (state.lastOperation === "SUB")
    newPrevValue = sub(state.previousValue, state.currentValue);

  if (state.lastOperation === "MULTIPLY")
    newPrevValue = multiply(state.previousValue, state.currentValue);

  if (state.lastOperation === "DIVIDE")
    newPrevValue = divide(state.previousValue, state.currentValue);

  return newPrevValue;
}

function add(n1, n2) {
  return toDecimalNumber(n1) + toDecimalNumber(n2);
}

function sub(n1, n2) {
  return toDecimalNumber(n1) - toDecimalNumber(n2);
}

function multiply(n1, n2) {
  return toDecimalNumber(n1) * toDecimalNumber(n2);
}

function divide(n1, n2) {
  return toDecimalNumber(n1) / toDecimalNumber(n2);
}

function hasDecimal(num) {
  return !Number.isInteger(Number.parseFloat(num));
}

function toDecimalNumber(strNum) {
  return Number.parseFloat(strNum);
}

function decimalNumToStr(num) {
  num = Number.parseFloat(num.toFixed(3));

  if (Number.isInteger(num)) return num.toString();

  return num.toString();
}
