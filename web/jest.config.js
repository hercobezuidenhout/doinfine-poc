module.exports = {
    moduleNameMapper: {
        "@tests/base": "<rootDir>/src/__tests__/base.js",
        "@tests/constants": "<rootDir>/src/__tests__/constants.js",
        "@providers/RouterProvider": "<rootDir>/src/providers/RouterProvider.js",
        "@pages": "<rootDir>/src/pages",
        "@components/molecules": "<rootDir>/src/components/molecules/index.js",
    },
    modulePathIgnorePatterns: ["e2e"]
}