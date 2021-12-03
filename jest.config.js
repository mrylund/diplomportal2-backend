module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
    roots: [
      "./tests/",
  ],
  testMatch: [
    "**/tests/**/*-test.[jt]s?(x)",
  ]
  };

  