const { config } = require('dotenv');

config();

const path = process.env.COVERAGE_DIR === 'server' ? 'server' : 'client';

module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  coverageDirectory: `<rootDir>/coverage/${process.env.COVERAGE_DIR || ''}`,
  moduleFileExtensions: ['js', 'jsx', 'json'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
  },
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^@server/(.*)$': '<rootDir>/src/server$1',
    '^@client/(.*)$': '<rootDir>/src/client$1',
    '^@shared/(.*)$': '<rootDir>/src/shared$1',
    '^@e2e/(.*)$': '<rootDir>/src/e2e$1',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFilesAfterEnv: [`<rootDir>/tests/jest.setup.${path}.js`],
};
