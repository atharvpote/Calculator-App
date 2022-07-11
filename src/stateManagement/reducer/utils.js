export function add(n1, n2) {
  return toNum(n1) + toNum(n2);
}

export function sub(n1, n2) {
  return toNum(n1) - toNum(n2);
}

export function multiply(n1, n2) {
  return toNum(n1) * toNum(n2);
}

export function divide(n1, n2) {
  return toNum(n1) / toNum(n2);
}

export function toNum(strNum) {
  return Number.parseFloat(strNum);
}

export function toStr(num) {
  return Number.parseFloat(num.toFixed(8)).toString();
}

export function lastChar(str) {
  return str[str.length - 1];
}

export function removeLastChar(str) {
  return str.substring(0, str.length - 1);
}

export function isValidNumber(num) {
  return Number.parseFloat(num) < Number.MAX_SAFE_INTEGER;
}

export function lastStateInvalidOrInfinity(state) {
  return (
    (state.previous !== null && !Number.isFinite(state.previous)) ||
    state.lastOpInvalid
  );
}

export function lastActionIsAnOperation(state) {
  return ["ADD", "SUB", "MULTIPLY", "DIVIDE"].some(
    (operation) => operation === state.lastAction
  );
}

export function calculate(state) {
  if (state.lastOperation === "ADD") return add(state.previous, state.current);

  if (state.lastOperation === "SUB") return sub(state.previous, state.current);

  if (state.lastOperation === "MULTIPLY")
    return multiply(state.previous, state.current);

  if (state.lastOperation === "DIVIDE")
    return divide(state.previous, state.current);
}
