import { thunk, action } from 'easy-peasy';

const nav = {
  isOpen: false,
  isAnimated: false,
  toggleNav: thunk((actions, payload, { getState }) => {
    if (!getState().isAnimated) {
      actions.toggleState(payload);

      setTimeout(() => {
        actions.setAnimated();
      }, 350);
    }
  }),
  closeNav: action((state) => {
    if (state.isOpen) state.isOpen = false;
  }),
  toggleState: action((state, payload) => {
    state.isAnimated = true;

    if (payload !== undefined) {
      state.isOpen = payload;
    } else {
      state.isOpen = !state.isOpen;
    }
  }),
  setAnimated: action((state) => {
    if (state.isAnimated) state.isAnimated = false;
  }),
};

export default nav;
