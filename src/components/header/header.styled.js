import { hideVisually } from "polished";
import styled, { css } from "styled-components";
import { typeScale, dark, light, purple } from "../../utils";

export const StyledHeader = styled.header`
  transition: all 0.5s;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: ${typeScale.heading1};
  }
`;

export const Themes = styled.div`
  width: 75%;
  max-width: 10rem;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  place-content: center;
  place-items: center;
`;

export const ThemesLabel = styled.span`
  grid-row: 1/4;
  align-self: flex-end;
  padding-bottom: 0.5rem;
  font-size: ${typeScale.helperText};
`;
export const ThemesIndicator = styled.div`
  grid-column: 2/3;
  align-self: flex-end;
  justify-self: normal;
  display: flex;
  justify-content: space-between;
  padding-inline: 0.5rem;
  font-size: ${typeScale.helperText};
`;

export const Toggles = styled.div`
  grid-row: 2/4;
  grid-column: 2/3;
  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    grid-column: 1/2;
    grid-row: 1/3;
  }

  & > div {
    grid-column: 2/3;
  }
`;

export const ToggleSwitch = styled.input.attrs({ type: "checkbox" })`
  ${hideVisually()}
`;

export const BaseToggle = styled.label`
  --scale: 0.15;
  cursor: pointer;
  text-indent: -9999px;
  width: calc(var(--scale) * 200px);
  height: calc(var(--scale) * 200px);
  background-color: ${({ theme }) => theme.toggle.toggleBackground};
  display: block;
  border-radius: calc(var(--scale) * 100px);
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: calc(var(--scale) * 40px);
    left: calc(var(--scale) * 40px);
    width: calc(var(--scale) * 120px);
    height: calc(var(--scale) * 120px);
    background-color: ${({ theme }) => theme.toggle.toggleColor};
    border-radius: calc(var(--scale) * 120px);
    transition: 0.5s;
    z-index: 10;

    ${({ enabled }) => {
      if (enabled === dark) {
        return css`
          left: calc(var(--scale) * 40px);
          transform: translateX(0%);
        `;
      }

      if (enabled === light) {
        return css`
          left: calc(150% - calc(var(--scale) * 20px));
          transform: translateX(-50%);
        `;
      }

      if (enabled === purple) {
        return css`
          left: calc(300% - calc(var(--scale) * 40px));
          transform: translateX(-100%);
        `;
      }
    }}
  }
`;

export const ToggleFirst = styled(BaseToggle)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

export const ToggleSecond = styled(BaseToggle)`
  border-radius: 0;

  &:after {
    content: none;
  }
`;

export const ToggleThird = styled(BaseToggle)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  &:after {
    content: none;
  }
`;
