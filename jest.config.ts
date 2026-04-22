import type { Config } from 'jest'

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',

    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.test.json',
        },
    },

    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

    moduleNameMapper: {
        '\\.(css|scss|less)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
}

export default config