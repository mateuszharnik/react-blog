const { basename } = require('path');

module.exports = {
  process(_, source) {
    return {
      code: `module.exports = ${JSON.stringify(basename(source))};`,
    };
  },
};
