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
  decimalToBeResolved: false,
  hasDecimal: false,
  equalsWasLastOperation: false,
};

function reducer(state, action) {
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
    return handleAdd(state);
  }

  if (action.type === "SUB") {
    return handleSub(state);
  }

  if (action.type === "MULTIPLY") {
    return handleMultiply(state);
  }

  if (action.type === "DIVIDE") {
    return handleDivide(state);
  }

  if (action.type === "EQUALS") {
    return handleEquals(state);
  }

  if (action.type === "RESET") {
    const currentTheme = state.currentTheme;
    return { ...initialState, currentTheme };
  }

  return state;
}

function handleNumPress(state, action) {
  const newValue =
    state.currentValue === "0" || state.equalsWasLastOperation
      ? action.payload.value
      : state.currentValue + action.payload.value;

  if (isValidNumber(newValue))
    if (state.equalsWasLastOperation) {
      return {
        ...state,
        previousValue: null,
        currentValue: newValue,
        decimalToBeResolved: false,
        equalsWasLastOperation: false,
      };
    }
  return {
    ...state,
    currentValue: newValue,
    decimalToBeResolved: false,
    equalsWasLastOperation: false,
  };
}

function handleDel(state) {
  const currentValue = state.currentValue;

  if (currentValue === "Infinity")
    return {
      ...state,
      currentValue: "0",
      decimalToBeResolved: true,
    };

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

function handleDecimal(state) {
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

function handleAdd(state) {
  if (!state.previousValue) {
    const newPrevValue = state.currentValue;

    return {
      ...state,
      lastOperation: "ADD",
      previousValue: toDecimalNumber(newPrevValue),
      currentValue: "0",
      hasDecimal: false,
    };
  }

  if (state.equalsWasLastOperation) {
    const newPrevValue = state.currentValue;

    return {
      ...state,
      lastOperation: "ADD",
      previousValue: toDecimalNumber(newPrevValue),
      currentValue: "0",
      equalsWasLastOperation: false,
      hasDecimal: false,
    };
  }

  let newPrevValue;

  if (state.lastOperation === "ADD")
    newPrevValue = add(state.previousValue, state.currentValue);

  if (state.lastOperation === "SUB")
    newPrevValue = sub(state.previousValue, state.currentValue);

  if (state.lastOperation === "MULTIPLY")
    newPrevValue = multiply(state.previousValue, state.currentValue);

  if (state.lastOperation === "DIVIDE")
    newPrevValue = divide(state.previousValue, state.currentValue);

  return {
    ...state,
    lastOperation: "ADD",
    previousValue: newPrevValue,
    currentValue: "0",
    hasDecimal: false,
  };
}

function handleSub(state) {
  if (!state.previousValue) {
    const newPrevValue = state.currentValue;

    return {
      ...state,
      lastOperation: "SUB",
      previousValue: toDecimalNumber(newPrevValue),
      currentValue: "0",
      hasDecimal: false,
    };
  }

  if (state.equalsWasLastOperation) {
    const newPrevValue = state.currentValue;

    return {
      ...state,
      lastOperation: "SUB",
      previousValue: toDecimalNumber(newPrevValue),
      currentValue: "0",
      equalsWasLastOperation: false,
      hasDecimal: false,
    };
  }

  let newPrevValue;

  if (state.lastOperation === "ADD")
    newPrevValue = add(state.previousValue, state.currentValue);

  if (state.lastOperation === "SUB")
    newPrevValue = sub(state.previousValue, state.currentValue);

  if (state.lastOperation === "MULTIPLY")
    newPrevValue = multiply(state.previousValue, state.currentValue);

  if (state.lastOperation === "DIVIDE")
    newPrevValue = divide(state.previousValue, state.currentValue);

  return {
    ...state,
    lastOperation: "SUB",
    previousValue: newPrevValue,
    currentValue: "0",
    hasDecimal: false,
  };
}

function handleMultiply(state) {
  if (!state.previousValue) {
    const newPrevValue = state.currentValue;

    return {
      ...state,
      lastOperation: "MULTIPLY",
      previousValue: toDecimalNumber(newPrevValue),
      currentValue: "0",
      hasDecimal: false,
    };
  }

  if (state.equalsWasLastOperation) {
    const newPrevValue = state.currentValue;

    return {
      ...state,
      lastOperation: "MULTIPLY",
      previousValue: toDecimalNumber(newPrevValue),
      currentValue: "0",
      equalsWasLastOperation: false,
      hasDecimal: false,
    };
  }

  let newPrevValue;

  if (state.lastOperation === "ADD")
    newPrevValue = add(state.previousValue, state.currentValue);

  if (state.lastOperation === "SUB")
    newPrevValue = sub(state.previousValue, state.currentValue);

  if (state.lastOperation === "MULTIPLY")
    newPrevValue = multiply(state.previousValue, state.currentValue);

  if (state.lastOperation === "DIVIDE")
    newPrevValue = divide(state.previousValue, state.currentValue);

  return {
    ...state,
    lastOperation: "MULTIPLY",
    previousValue: newPrevValue,
    currentValue: "0",
    hasDecimal: false,
  };
}

function handleDivide(state) {
  if (!state.previousValue) {
    const newPrevValue = state.currentValue;

    return {
      ...state,
      lastOperation: "DIVIDE",
      previousValue: toDecimalNumber(newPrevValue),
      currentValue: "0",
      hasDecimal: false,
    };
  }

  if (state.equalsWasLastOperation) {
    const newPrevValue = state.currentValue;

    return {
      ...state,
      lastOperation: "DIVIDE",
      previousValue: toDecimalNumber(newPrevValue),
      currentValue: "0",
      equalsWasLastOperation: false,
      hasDecimal: false,
    };
  }

  let newPrevValue;

  if (state.lastOperation === "ADD")
    newPrevValue = add(state.previousValue, state.currentValue);

  if (state.lastOperation === "SUB")
    newPrevValue = sub(state.previousValue, state.currentValue);

  if (state.lastOperation === "MULTIPLY")
    newPrevValue = multiply(state.previousValue, state.currentValue);

  if (state.lastOperation === "DIVIDE")
    newPrevValue = divide(state.previousValue, state.currentValue);

  return {
    ...state,
    lastOperation: "DIVIDE",
    previousValue: newPrevValue,
    currentValue: "0",
    hasDecimal: false,
  };
}

function handleEquals(state) {
  if (state.lastOperation === "ADD") {
    const newPrevAndCurrValue = add(state.previousValue, state.currentValue);

    return {
      ...state,
      previousValue: newPrevAndCurrValue,
      currentValue: decimalNumToStr(newPrevAndCurrValue),
      lastOperation: null,
      equalsWasLastOperation: true,
      hasDecimal: false,
    };
  }

  if (state.lastOperation === "SUB") {
    const newPrevAndCurrValue = sub(state.previousValue, state.currentValue);

    return {
      ...state,
      previousValue: newPrevAndCurrValue,
      currentValue: decimalNumToStr(newPrevAndCurrValue),
      lastOperation: null,
      equalsWasLastOperation: true,
      hasDecimal: false,
    };
  }

  if (state.lastOperation === "MULTIPLY") {
    const newPrevAndCurrValue = multiply(
      state.previousValue,
      state.currentValue
    );

    return {
      ...state,
      previousValue: newPrevAndCurrValue,
      currentValue: decimalNumToStr(newPrevAndCurrValue),
      lastOperation: null,
      equalsWasLastOperation: true,
      hasDecimal: false,
    };
  }

  if (state.lastOperation === "DIVIDE") {
    const newPrevAndCurrValue = divide(state.previousValue, state.currentValue);

    return {
      ...state,
      previousValue: newPrevAndCurrValue,
      currentValue: decimalNumToStr(newPrevAndCurrValue),
      lastOperation: null,
      equalsWasLastOperation: true,
      hasDecimal: false,
    };
  }

  return { ...state, currentValue: decimalNumToStr(state.previousValue) };
}

function toDecimalNumber(strNum) {
  return Number.parseFloat(strNum);
}

function decimalNumToStr(num) {
  num = Number.parseFloat(num.toFixed(3));

  if (Number.isInteger(num)) return num.toString();

  return num.toString();
}

function isValidNumber(num) {
  return (
    (Number.isInteger(toDecimalNumber(num)) &&
      Number.parseInt(num) < Number.MAX_SAFE_INTEGER) ||
    toDecimalNumber(num) < Number.MAX_VALUE
  );
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
