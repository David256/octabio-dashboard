const tintColorLight = '#381EC5';
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
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tintInactive: tintInactiveColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  led: {
    on: '#f0f000',
    off: '#000',
  },
  tabBar: {
    active: '#8226C9',
    inactive: '#601C94',
  }
};
