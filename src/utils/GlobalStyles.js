import { createGlobalStyle } from "styled-components";
import { baseFontSize, fontFamily } from "./typography";

export const GlobalStyles = createGlobalStyle`
html{
    box-sizing: border-box;
}

*,*::after,*::before{
    box-sizing: inherit;
}

body{
    margin: 0;
    font-family: ${fontFamily};
    font-size: ${baseFontSize}px;
    min-height: 100vh;
    display: grid;
    place-content: center;
    background-color: ${({ theme }) => theme.backgrounds.mainBackground};
    color: ${({ theme }) => theme.text.title};
}
`;
