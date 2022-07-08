import { arrayOf, object } from "prop-types";
import styled from "styled-components";
import { fluidRange } from "polished";

export function Container({ children }) {
  console.log(children);

  return <StyledContainer>{children}</StyledContainer>;
}

Container.propTypes = {
  children: arrayOf(object),
};

const StyledContainer = styled.div`
  ${fluidRange(
    {
      prop: "width",
      fromSize: "280px",
      toSize: "576px",
    },
    "280px",
    "1440px"
  )}
`;
