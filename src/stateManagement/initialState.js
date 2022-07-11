import { dark } from "../utils";

const initialState = {
  theme: dark,
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
