import { createRoot } from "react-dom/client";
import { GlobalStyles } from "./utils";
import { Container, Header, Screen, Keypad } from "./components";
import { StateContextProvider } from "./stateManagement";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <div>
    <StateContextProvider>
      <GlobalStyles />
      <Container>
        <Header />
        <Screen />
        <Keypad />
      </Container>
    </StateContextProvider>
  </div>
);
