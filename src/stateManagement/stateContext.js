import { createContext, useReducer, useEffect } from "react";
import { arrayOf, element } from "prop-types";
import { ThemeProvider } from "styled-components";
import { reducer } from "./reducer";
import initialState from "./initialState";
import { dark } from "../utils";

export const StateContext = createContext();

export function StateContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      dispatch({
        type: "THEME",
        payload: {
          theme: JSON.parse(localStorage.getItem("theme")),
        },
      });
    } else localStorage.setItem("theme", JSON.stringify(dark));
  }, []);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={state.theme}>{children}</ThemeProvider>
    </StateContext.Provider>
  );
}

StateContextProvider.propTypes = {
  children: arrayOf(element),
};
