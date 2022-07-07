import { rem } from "polished";

export const fontFamily = `'League Spartan', sans-serif`;

export const baseFontSize = 32;

const scaleFactor = 1.125;

export const typeScale = {
  heading1: `${rem(baseFontSize * scaleFactor ** 5)}`,
  heading2: `${rem(baseFontSize * scaleFactor ** 4)}`,
  heading3: `${rem(baseFontSize * scaleFactor ** 3)}`,
  heading4: `${rem(baseFontSize * scaleFactor ** 2)}`,
  heading5: `${rem(baseFontSize * scaleFactor)}`,
  paragraph: `${rem(baseFontSize)}`,
  helperText: `${rem(baseFontSize * scaleFactor ** -1)}`,
  copyright: `${rem(baseFontSize * scaleFactor ** -2)}`,
  disclaimer: `${rem(baseFontSize * scaleFactor ** -3)}`,
};

export const fontWeight = 700;
