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
  currentValue: "0",
  currentTheme: purple,
  decimalToBeResolved: false,
  hasDecimal: false,
};

function reducer(state, action) {
  if (action.type === "NUM_PRESS") {
    const newValue =
      state.currentValue === "0"
        ? action.payload.value
        : state.currentValue + action.payload.value;

    if (Number.isInteger(Number.parseFloat(newValue))) {
      if (Number.parseInt(newValue) < Number.MAX_SAFE_INTEGER)
        return {
          ...state,
          currentValue: newValue,
          decimalToBeResolved: false,
        };
    } else if (Number.parseFloat(newValue) < Number.MAX_VALUE) {
      return {
        ...state,
        currentValue: newValue,
        decimalToBeResolved: false,
      };
    } else {
      return state;
    }
  }

  if (action.type === "DEL") {
    const currentValue = state.currentValue;
    const newValue = currentValue.substring(0, currentValue.length - 1);

    if (currentValue[currentValue.length - 2] === ".") {
      return {
        ...state,
        currentValue: newValue,
        decimalToBeResolved: true,
      };
    } else if (currentValue[currentValue.length - 1] === ".") {
      return {
        ...state,
        currentValue: newValue,
        hasDecimal: false,
        decimalToBeResolved: false,
      };
    } else if (!newValue.length) {
      return {
        ...state,
        currentValue: "0",
      };
    } else {
      return {
        ...state,
        currentValue: newValue,
      };
    }
  }

  if (action.type === "DECIMAL") {
    if (!state.hasDecimal) {
      const newValue = state.currentValue + ".";

      return {
        ...state,
        currentValue: newValue,
        decimalToBeResolved: true,
        hasDecimal: true,
      };
    }
  }

  if (action.type === "RESET") {
    return { ...initialState, currentTheme: state.currentTheme };
  }

  return state;
}
