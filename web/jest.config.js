module.exports = {
    moduleNameMapper: {
        "@tests/base": "<rootDir>/test/base.js",
        "@tests/constants": "<rootDir>/test/constants.js",
        "@providers/RouterProvider": "<rootDir>/src/providers/RouterProvider.js",
        "@providers/TeamProvider": "<rootDir>/src/providers/TeamProvider.js",
        "@pages": "<rootDir>/src/pages",
        "@components/molecules": "<rootDir>/src/components/molecules/index.js",
        "@components/atoms": "<rootDir>/src/components/atoms/index.js",
        "@components/organisms": "<rootDir>/src/components/organisms/index.js",
        "@components/templates": "<rootDir>/src/components/templates/index.js",
        "@services": "<rootDir>/src/services/index.js",
    },
    modulePathIgnorePatterns: ["e2e"]
}