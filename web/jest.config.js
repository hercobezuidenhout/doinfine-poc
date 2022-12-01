module.exports = {
    moduleNameMapper: {
        "@tests/base": "<rootDir>/test/base.js",
        "@tests/constants": "<rootDir>/test/constants.js",
        "@providers/RouterProvider": "<rootDir>/src/providers/RouterProvider.js",
        "@providers/TeamProvider": "<rootDir>/src/providers/TeamProvider.js",
        "@providers/OuterAuthProvider": "<rootDir>/src/providers/OuterAuthProvider.js",
        "@providers/InnerAuthProvider": "<rootDir>/src/providers/InnerAuthProvider.js",
        "@providers/UserProvider": "<rootDir>/src/providers/UserProvider.js",
        "@providers/WebNotificationsProvider": "<rootDir>/src/providers/WebNotificationsProvider.js",
        "@pages": "<rootDir>/src/pages",
        "@components/molecules": "<rootDir>/src/components/molecules/index.js",
        "@components/atoms": "<rootDir>/src/components/atoms/index.js",
        "@components/organisms": "<rootDir>/src/components/organisms/index.js",
        "@components/templates": "<rootDir>/src/components/templates/index.js",
        "@services": "<rootDir>/src/services/index.js",
    },
    modulePathIgnorePatterns: ["e2e"]
}