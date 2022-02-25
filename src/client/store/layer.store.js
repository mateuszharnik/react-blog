/* eslint-disable no-param-reassign */
import { action } from 'easy-peasy';

const layer = {
  isLayerActive: true,
  addLayer: action((state) => {
    if (!state.isLayerActive) {
      state.isLayerActive = true;
    }
  }),
  removeLayer: action((state) => {
    if (state.isLayerActive) {
      state.isLayerActive = false;
    }
  }),
};

export default layer;
