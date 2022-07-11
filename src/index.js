import { createRoot } from "react-dom/client";
import { GlobalStyles } from "./utils";
import { Container, Header, Screen, Keypad } from "./components";
import { StateContextProvider } from "./stateManagement";
import { StrictMode } from "react";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <div>
    <StrictMode>
      <StateContextProvider>
        <GlobalStyles />
        <Container>
          <Header />
          <Screen />
          <Keypad />
        </Container>
      </StateContextProvider>
    </StrictMode>
  </div>
);
