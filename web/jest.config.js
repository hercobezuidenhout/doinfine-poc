module.exports = {
    moduleNameMapper: {
        "@tests/base": "<rootDir>/src/__tests__/base.js",
        "@providers/RouterProvider": "<rootDir>/src/providers/RouterProvider.js",
        "@pages": "<rootDir>/src/pages"
    },
    modulePathIgnorePatterns: ["e2e"]
}