import { arrayOf, element } from "prop-types";
import { StyledContainer } from "./container.styled";

export function Container({ children }) {
  return <StyledContainer>{children}</StyledContainer>;
}

Container.propTypes = {
  children: arrayOf(element),
};
