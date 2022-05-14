module.exports = {
    parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: "."
    },
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".tsx", ".ts"]
            }
        }
    },
    rules: {
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off"
    }
};
