import { dark, light, purple } from "../../utils";

export function handleThemeChange(state, action) {
  if (action.type === "DARKTHEME") return { ...state, theme: dark };

  if (action.type === "LIGHTTHEME") return { ...state, theme: light };

  if (action.type === "PURPLETHEME") return { ...state, theme: purple };
}
