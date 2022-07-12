import { useContext } from "react";
import { StateContext } from "../../stateManagement";
import { dark, light, purple } from "../../utils";
import {
  StyledHeader,
  Themes,
  ThemesIndicator,
  ThemesLabel,
  ToggleFirst,
  Toggles,
  ToggleSecond,
  ToggleSwitch,
  ToggleThird,
} from "./header.styled";

export function Header() {
  const { state, dispatch } = useContext(StateContext);

  return (
    <StyledHeader>
      <h1>calc</h1>
      <Themes>
        <ThemesLabel>THEME</ThemesLabel>
        <ThemesIndicator>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </ThemesIndicator>
        <Toggles>
          <ToggleSwitch
            type="checkbox"
            id="first"
            checked={state.theme === dark}
            onChange={darkTheme}
          />
          <ToggleSwitch
            type="checkbox"
            id="second"
            checked={state.theme === light}
            onChange={lightTheme}
          />
          <ToggleSwitch
            type="checkbox"
            id="third"
            checked={state.theme === purple}
            onChange={purpleTheme}
          />
          <ToggleFirst enabled={state.theme} htmlFor="first">
            Toggle
          </ToggleFirst>
          <ToggleSecond enabled={state.theme} htmlFor="second">
            Toggle
          </ToggleSecond>
          <ToggleThird enabled={state.theme} htmlFor="third">
            Toggle
          </ToggleThird>
        </Toggles>
      </Themes>
    </StyledHeader>
  );

  function darkTheme() {
    dispatch({ type: "DARKTHEME" });
  }

  function lightTheme() {
    dispatch({ type: "LIGHTTHEME" });
  }

  function purpleTheme() {
    dispatch({ type: "PURPLETHEME" });
  }
}
