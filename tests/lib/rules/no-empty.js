"use strict";

const rule = require("../../../lib/rules/no-empty");
const tailwindcss = require("../../../lib/configs/tailwindcss");
const { RuleTester } = require("eslint");

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  }
});

var ruleTester = new RuleTester();

ruleTester.run("no-empty", rule, {
  valid: [
    { code: '<div className="x" />' },
    { code: '<div className={"x"} />' },
    { code: "<div className={`x`} />" }
  ],
  invalid: [
    {
      code: '<div className="" />',
      output: '<div  />',
      errors: [
        {
          message: "no empty className allowed"
        }
      ]
    },
    {
      code: '<div className={""} />',
      output: '<div  />',
      errors: [
        {
          message: "no empty className allowed"
        }
      ]
    },
    {
      code: '<div className={``} />',
      output: '<div  />',
      errors: [
        {
          message: "no empty className allowed"
        }
      ]
    },
  ]
});
