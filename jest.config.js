module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts(x)'],
  modulePaths: ['<rootDir>/src/', '<rootDir>/.jest'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/src/Mocks/svg/svgrMock.tsx',
    'react-i18next': '<rootDir>/src/Mocks/react-i18next/react-i18next-mock.ts'
  }
}
