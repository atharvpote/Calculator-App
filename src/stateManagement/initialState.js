import { dark } from "../utils";

let theme = dark;

if (localStorage.getItem("theme"))
  theme = JSON.parse(localStorage.getItem("theme"));

const initialState = {
  theme,
  current: "0",
  previous: null,
  lastAction: null,
  currentOperation: null,
  lastOperation: null,
  operationTriggered: false,
  lastOpInvalid: false,
  hasDecimal: false,
  firstInput: true,
};

export default initialState;
