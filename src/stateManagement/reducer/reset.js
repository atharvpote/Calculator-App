import initialState from "../initialState";

export function reset(state, action) {
  const newState = {
    ...initialState,
    theme: state.theme,
    lastAction: action.type,
  };

  return newState;
}
