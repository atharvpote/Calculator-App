import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, dark } from "./utils";
import { Container, Header, Screen, Keypad } from "./components";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <div>
    <ThemeProvider theme={dark}>
      <GlobalStyles />
      <Container>
        <Header />
        <Screen />
        <Keypad />
      </Container>
    </ThemeProvider>
  </div>
);
