module.exports = {
    moduleNameMapper: {
        "@tests/base": "<rootDir>/src/__tests__/base.js",
        "@providers/RouterProvider": "<rootDir>/src/providers/RouterProvider.js",
        "@pages": "<rootDir>/src/pages",
        "@components/organisms": "<rootDir>/src/components/organisms"
    },
    modulePathIgnorePatterns: ["e2e"]
}