import { handleNumPress } from "./handleNumPress";
import { handleDel } from "./handleDel";
import { handleDecimal } from "./handleDecimal";
import { handleOperation } from "./handleOperation";
import { handleEquals } from "./handleEquals";
import { handleThemeChange } from "./handleThemeChange";
import { reset } from "./reset";

export function reducer(state, action) {
  if (action.type === "NUM_PRESS") return handleNumPress(state, action);

  if (action.type === "DEL") return handleDel(state, action);

  if (action.type === "DECIMAL") return handleDecimal(state, action);

  if (action.type === "ADD") return handleOperation(state, action);

  if (action.type === "SUB") return handleOperation(state, action);

  if (action.type === "MULTIPLY") return handleOperation(state, action);

  if (action.type === "DIVIDE") return handleOperation(state, action);

  if (action.type === "EQUALS") return handleEquals(state, action);

  if (action.type === "THEME") return handleThemeChange(state, action);

  if (action.type === "RESET") return reset(state, action);

  return state;
}
