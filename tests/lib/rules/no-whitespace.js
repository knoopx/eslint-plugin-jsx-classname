"use strict";

const rule = require("../../../lib/rules/no-whitespace");
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

ruleTester.run("no-whitespace", rule, {
  valid: [
    { code: '<div className="xxx" />' },
    { code: '<div className={"xxx"} />' },
    { code: "<div className={`xxx`} />" }
  ],
  invalid: [
    {
      code: '<div className="xxx " />',
      output: '<div className="xxx" />',
      errors: [
        {
          message: "should equal to 'xxx'"
        }
      ]
    },
    {
      code: '<div className=" a  b  c " />',
      output: '<div className="a b c" />',
      errors: [
        {
          message: "should equal to 'a b c'"
        }
      ]
    },

    {
      code: '<div className={"xxx "} />',
      output: '<div className={"xxx"} />',
      errors: [
        {
          message: "should equal to 'xxx'"
        }
      ]
    },
    {
      code: "<div className={`xxx `} />",
      output: "<div className={`xxx`} />",
      errors: [
        {
          message: "should equal to 'xxx'"
        }
      ]
    },
    {
      options: [{ callee: ["classNames"] }],
      code: '<div className={classNames("xxx ")} />',
      output: '<div className={classNames("xxx")} />',
      errors: [
        {
          message: "should equal to 'xxx'"
        }
      ]
    }
  ]
});
