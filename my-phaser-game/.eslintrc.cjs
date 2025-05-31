module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react/recommended", // Add this line
        "plugin:react/jsx-runtime", // Add this for React 17+ JSX transform
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true, // Enable JSX
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react-refresh", "react"], // Add 'react' plugin
    settings: {
        react: {
            version: "detect", // Automatically detect React version
        },
    },
    rules: {
        "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true },
        ],
    },
};

