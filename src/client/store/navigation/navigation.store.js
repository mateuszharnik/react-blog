import { thunk, action } from 'easy-peasy';

export const navigationStore = {
  main: {
    isOpen: false,
    isAnimated: false,
  },

  dropdown: {
    isOpen: false,
    isAnimated: false,
  },

  toggleMainNav: thunk((actions, isOpen, { getState }) => {
    if (!getState().main.isAnimated) {
      actions.toggleState({ isOpen, nav: 'main' });

      setTimeout(() => {
        actions.setAnimated('main');
      }, 350);
    }
  }),

  toggleDropdownNav: thunk((actions, isOpen, { getState }) => {
    if (!getState().dropdown.isAnimated) {
      actions.toggleState({ isOpen, nav: 'dropdown' });

      setTimeout(() => {
        actions.setAnimated('dropdown');
      }, 200);
    }
  }),

  closeMainNav: action((state) => {
    if (state.main.isOpen) state.main.isOpen = false;
  }),

  closeDropdownNav: action((state) => {
    if (state.dropdown.isOpen) state.dropdown.isOpen = false;
  }),

  toggleState: action((state, { nav = 'main', isOpen }) => {
    state[nav].isAnimated = true;

    if (isOpen !== undefined) {
      state[nav].isOpen = isOpen;
    } else {
      state[nav].isOpen = !state[nav].isOpen;
    }
  }),

  setAnimated: action((state, nav = 'main') => {
    if (state[nav].isAnimated) state[nav].isAnimated = false;
  }),
};
