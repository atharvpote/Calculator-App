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
  },
  toggle: {
    toggleColor: keyColors.red,
    toggleBackground: backgroundColors.veryDarkDesaturatedBlueV2,
  },
  text: {
    title: textColors.white,
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
  },
  toggle: {
    toggleColor: keyColors.orange,
    togglesBackground: backgroundColors.grayishRed,
  },
  text: {
    title: textColors.veryDarkGrayishYellow,
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
  },
  toggle: {
    toggleColor: keyColors.pureCyan,
    togglesBackground: backgroundColors.veryDarkVioletV2,
  },
  text: {
    title: textColors.lightYellow,
  },
};
