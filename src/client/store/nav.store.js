/* eslint-disable no-param-reassign */
import { thunk, action } from 'easy-peasy';

const nav = {
  isOpen: false,
  isDisabled: false,
  toggleNav: thunk((actions, payload, { getState }) => {
    if (!getState().isDisabled) {
      actions.toggleState(payload);

      setTimeout(() => {
        actions.setDisabled();
      }, 350);
    }
  }),
  closeNav: action((state) => {
    if (state.isOpen) state.isOpen = false;
  }),
  toggleState: action((state, payload) => {
    state.isDisabled = true;

    if (payload !== undefined) {
      state.isOpen = payload;
    } else {
      state.isOpen = !state.isOpen;
    }
  }),
  setDisabled: action((state) => {
    if (state.isDisabled) state.isDisabled = false;
  }),
};

export default nav;
