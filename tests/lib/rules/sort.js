"use strict";

const rule = require("../../../lib/rules/sort");
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

ruleTester.run("sort", rule, {
  valid: [
    { code: '<div className="a b" />' },
    { code: '<div className=" a  b " />' },
    {
      code: '<div className="flex m-0" />',
      options: [{ order: tailwindcss }]
    }
  ],
  invalid: [
    {
      code: '<div className="b a" />',
      output: '<div className="a b" />',
      errors: [
        {
          message: "should equal to 'a b'"
        }
      ]
    },
    {
      code: '<div className=" b  a " />',
      output: '<div className=" a  b " />',
      errors: [
        {
          message: "should equal to ' a  b '"
        }
      ]
    },
    {
      code: "<div className={`a c-${x} b`} />",
      output: "<div className={`a b c-${x}`} />",
      errors: [
        {
          message: "should equal to 'a b c-${x}'"
        }
      ]
    },
    {
      code: '<div className={"b a"} />',
      output: '<div className={"a b"} />',
      errors: [
        {
          message: "should equal to 'a b'"
        }
      ]
    },
    {
      code: '<div className="text-red b m-0 a flex" />',
      output: '<div className="flex m-0 text-red a b" />',
      options: [{ order: tailwindcss }],
      errors: [
        {
          message: "should equal to 'flex m-0 text-red a b'"
        }
      ]
    },
    {
      options: [{ callee: ["classNames"] }],
      code: '<div className={classNames("b a")} />',
      output: '<div className={classNames("a b")} />',
      errors: [
        {
          message: "should equal to 'a b'"
        }
      ]
    },
    {
      options: [{ callee: ["classNames"] }],
      code: '<div className={classNames("b a", {"d c": false})} />',
      output: '<div className={classNames("a b", {"c d": false})} />',
      errors: [
        {
          message: "should equal to 'a b'"
        },
        {
          message: "should equal to 'c d'"
        }
      ]
    },
    {
      options: [{ order: tailwindcss, callee: ["classNames"] }],
      code:
        "<div className={classNames(`avatar font-semibold bg-${color} text-white rounded-full flex items-center justify-center`, className)} />",
      output:
        "<div className={classNames(`flex items-center justify-center rounded-full bg-${color} text-white font-semibold avatar`, className)} />",
      errors: [
        {
          message:
            "should equal to 'flex items-center justify-center rounded-full bg-${color} text-white font-semibold avatar'"
        }
      ]
    },
    {
      code: "<div className={['border m-0', 'shadow flex-auto'].join(' ')} />",
      output:
        "<div className={['m-0 border', 'flex-auto shadow'].join(' ')} />",
      options: [{ order: tailwindcss }],
      errors: [
        {
          message: "should equal to 'm-0 border'"
        },
        {
          message: "should equal to 'flex-auto shadow'"
        }
      ]
    }
  ]
});
