"use strict";

const baseConfig = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  }
};

module.exports = {
  rules: {
    "no-duplicate": require("./lib/rules/no-duplicate"),
    "no-empty": require("./lib/rules/no-empty"),
    "no-whitespace": require("./lib/rules/no-whitespace"),
    "sort": require("./lib/rules/sort")
  },
  configs: {
    recommended: {
      ...baseConfig,
      rules: {
        "jsx-classname/no-duplicate": ["warn"],
        "jsx-classname/no-empty": ["warn"],
        "jsx-classname/no-whitespace": ["warn"],
        "jsx-classname/sort": ["warn"]
      }
    },
    tailwindcss: {
      ...baseConfig,
      rules: {
        "jsx-classname/sort": [
          "warn",
          {
            order: require("./lib/configs/tailwindcss")
          }
        ]
      }
    }
  }
};
