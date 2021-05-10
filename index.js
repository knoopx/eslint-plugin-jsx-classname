module.exports = {
  rules: {
    "no-duplicate": require("./lib/rules/no-duplicate"),
    "no-empty": require("./lib/rules/no-empty"),
    "no-whitespace": require("./lib/rules/no-whitespace"),
    "sort": require("./lib/rules/sort"),
  },
  configs: {
    recommended: {
      rules: {
        "jsx-classname/no-duplicate": ["warn"],
        "jsx-classname/no-empty": ["warn"],
        "jsx-classname/no-whitespace": ["warn"],
        "jsx-classname/sort": ["warn"],
      },
    },
    tailwindcss: {
      rules: {
        "jsx-classname/sort": [
          "warn",
          {
            order: require("./lib/configs/tailwindcss"),
          },
        ],
      },
    },
  },
}
