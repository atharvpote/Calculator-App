import styled from "styled-components";
import { fluidRange } from "polished";

export const StyledContainer = styled.div`
  ${fluidRange(
    {
      prop: "width",
      fromSize: "280px",
      toSize: "576px",
    },
    "280px",
    "1440px"
  )}

  ${fluidRange(
    {
      prop: "padding",
      fromSize: "8px",
      toSize: "0px",
    },
    "280px",
    "375px"
  )}
`;
