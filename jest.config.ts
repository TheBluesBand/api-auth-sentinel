import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  preset: 'ts-jest', // Use ts-jest preset for TypeScript support
  testEnvironment: 'node', // Set the test environment to Node.js
  testMatch: ['**/src/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'], // Match test files in the src directory
  moduleFileExtensions: ['ts', 'js', 'json', 'node'], // Recognize these file extensions
  collectCoverage: true, // Enable coverage collection
  coverageDirectory: 'coverage', // Output coverage reports to the 'coverage' directory
  coverageReporters: ['text', 'lcov'], // Use text and lcov coverage reporters
};

export default config;