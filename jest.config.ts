import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';

const config: Config.InitialOptions = {
    rootDir: './',
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./jest.setup.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    transform: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/svgTransform.js',
        '^.+\\.ts?$': 'ts-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    modulePaths: ['./'], // <-- This will be set to 'baseUrl' value
    moduleNameMapper: {
        ...pathsToModuleNameMapper(
            {
                '@/*': ['src/*'],
            } /*, { prefix: '<rootDir>/' } */,
        ),
        uuid: require.resolve('uuid'),
    },
    globals: {
        'ts-jest': {
            babelConfig: false,
            tsconfig: './tsconfig.spec.json',
        },
    },
};

export default config;
