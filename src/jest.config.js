module.exports = {
  // Use react-scripts test configuration as base
  testEnvironment: 'jsdom',

  // Transform files with babel-jest
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/react-scripts/config/jest/babelTransform.js',
    '^.+\\.css$': '<rootDir>/node_modules/react-scripts/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/node_modules/react-scripts/config/jest/fileTransform.js',
  },

  // Transform ESM modules from node_modules
  transformIgnorePatterns: [
    'node_modules/(?!(axios|@stripe|antd|rc-.*|@ant-design|@babel/runtime)/)',
  ],

  // Module name mapper for static assets and styles
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
  },

  // Setup files
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  // Module directories
  modulePaths: ['<rootDir>/src'],

  // Test match patterns
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],

  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.js',
    '!src/reportWebVitals.js',
    '!src/**/*.stories.{js,jsx}',
    '!src/setupTests.js',
  ],

  // Coverage thresholds - focused on tested modules
  coverageThresholds: {
    // Global thresholds set to achievable levels
    global: {
      branches: 5,
      functions: 5,
      lines: 5,
      statements: 5,
    },
    // High thresholds for actively tested directories
    './src/utils/**/*.js': {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
    './src/state/modules/**/*.js': {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },

  // Reset mocks between tests
  resetMocks: true,

  // Verbose output
  verbose: true,
};
