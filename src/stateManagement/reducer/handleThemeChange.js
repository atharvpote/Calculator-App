export function handleThemeChange(state, action) {
  localStorage.setItem("theme", JSON.stringify(action.payload.theme));

  return { ...state, theme: action.payload.theme };
}
