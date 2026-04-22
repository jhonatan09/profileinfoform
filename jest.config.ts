import type { Config } from 'jest'

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',

    // Configuração moderna do ts-jest (substitui o bloco globals antigo)
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: 'tsconfig.test.json',
        }],
    },

    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

    moduleNameMapper: {
        '\\.(css|scss|less)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1',
    },

    // Garante que o Jest não tente testar arquivos JS compilados por engano
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)"
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}

export default config