export const colorPrimary = '#381EC5';

export const colorGray = '#d6d6d6';
export const colorGreen = '#81FA6D';

const tintColorLight = colorPrimary;
const tintColorDark = '#fff';

const tintInactiveColorLight = '#614FC5';
const tintInactiveColorDark = '#999';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tintInactive: tintInactiveColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    textInput: '#000',
    led: {
      on: '#f0f000',
      off: '#000',
    },
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tintInactive: tintInactiveColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    textInput: '#fff',
    led: {
      on: '#f0f000',
      off: '#fff',
    },
  },
  tabBar: {
    active: '#8226C9',
    inactive: '#601C94',
  }
};
