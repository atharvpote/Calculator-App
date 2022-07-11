import { mix } from "polished";
import { backgroundColors, keyColors, textColors } from "./colors";

export const dark = {
  backgrounds: {
    mainBackground: backgroundColors.veryDarkDesaturatedBlueV1,
    keypadBackground: backgroundColors.veryDarkDesaturatedBlueV2,
    screenBackground: backgroundColors.veryDarkDesaturatedBlueV3,
  },
  keys: {
    delAndRestKeys: {
      keyBackground: keyColors.desaturatedDarkBlueV1,
      keyShadow: keyColors.desaturatedDarkBlueV2,
      keyText: textColors.white,
    },
    equalsKey: {
      keyBackground: keyColors.red,
      keyShadow: keyColors.darkRed,
      keyText: textColors.white,
    },
    normalKeys: {
      keyBackground: keyColors.lightGrayishOrange,
      keyShadow: keyColors.grayishOrange,
      keyText: textColors.veryDarkGrayishBlue,
    },
    operationHighlight: {
      keyBackground: `${mix(
        0.25,
        keyColors.lightGrayishOrange,
        keyColors.red
      )}`,
      keyShadow: `${mix(0.25, keyColors.grayishOrange, keyColors.darkRed)}`,
      keyText: textColors.white,
    },
  },
  toggle: {
    toggleColor: keyColors.red,
    toggleBackground: backgroundColors.veryDarkDesaturatedBlueV2,
  },
  text: {
    title: textColors.white,
    screenText: textColors.white,
  },
};

export const light = {
  backgrounds: {
    mainBackground: backgroundColors.lightGray,
    keypadBackground: backgroundColors.grayishRed,
    screenBackground: backgroundColors.veryLightGray,
  },
  keys: {
    delAndRestKeys: {
      keyBackground: keyColors.darkModerateCyan,
      keyShadow: keyColors.veryDarkCyan,
      keyText: textColors.white,
    },
    equalsKey: {
      keyBackground: keyColors.orange,
      keyShadow: keyColors.darkOrange,
      keyText: textColors.white,
    },
    normalKeys: {
      keyBackground: keyColors.lightGrayishYellow,
      keyShadow: keyColors.darkGrayishOrange,
      keyText: textColors.veryDarkGrayishYellow,
    },
    operationHighlight: {
      keyBackground: `${mix(
        0.5,
        keyColors.lightGrayishYellow,
        keyColors.orange
      )}`,
      keyShadow: `${mix(
        0.5,
        keyColors.darkGrayishOrange,
        keyColors.darkOrange
      )}`,
      keyText: textColors.white,
    },
  },
  toggle: {
    toggleColor: keyColors.orange,
    togglesBackground: backgroundColors.grayishRed,
  },
  text: {
    title: textColors.veryDarkGrayishYellow,
    screenText: textColors.veryDarkGrayishYellow,
  },
};

export const purple = {
  backgrounds: {
    mainBackground: backgroundColors.veryDarkVioletV1,
    keypadBackground: backgroundColors.veryDarkVioletV2,
    screenBackground: backgroundColors.veryDarkVioletV2,
  },
  keys: {
    delAndRestKeys: {
      keyBackground: keyColors.darkViolet,
      keyShadow: keyColors.vividMagenta,
      keyText: textColors.white,
    },
    equalsKey: {
      keyBackground: keyColors.pureCyan,
      keyShadow: keyColors.softCyan,
      keyText: textColors.veryDarkBlue,
    },
    normalKeys: {
      keyBackground: keyColors.veryDarkViolet,
      keyShadow: keyColors.darkMagenta,
      keyText: textColors.lightYellow,
    },
    operationHighlight: {
      keyBackground: `${mix(
        0.75,
        keyColors.veryDarkViolet,
        keyColors.pureCyan
      )}`,
      keyShadow: `${mix(0.25, keyColors.darkMagenta, keyColors.softCyan)}`,
      keyText: textColors.white,
    },
  },
  toggle: {
    toggleColor: keyColors.pureCyan,
    togglesBackground: backgroundColors.veryDarkVioletV2,
  },
  text: {
    title: textColors.lightYellow,
    screenText: textColors.lightYellow,
  },
};
