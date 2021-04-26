const { RuleTester } = require("eslint")

const rule = require("../../../lib/rules/no-duplicate")

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
})

const ruleTester = new RuleTester()

ruleTester.run("no-duplicate", rule, {
  valid: [
    { code: '<div className="xxx" />' },
    { code: '<div className={"xxx"} />' },
    { code: "<div className={`xxx`} />" },
  ],
  invalid: [
    {
      code: '<div className=" a b  a " />',
      output: '<div className=" a b  " />',
      errors: [
        {
          message: "should equal to ' a b  '",
        },
      ],
    },
    {
      code: '<div className={"a a "} />',
      output: '<div className={"a "} />',
      errors: [
        {
          message: "should equal to 'a '",
        },
      ],
    },
    {
      code: "<div className={`a a `} />",
      output: "<div className={`a `} />",
      errors: [
        {
          message: "should equal to 'a '",
        },
      ],
    },
    {
      options: [{ callee: ["classNames"] }],
      code: '<div className={classNames("a a ")} />',
      output: '<div className={classNames("a ")} />',
      errors: [
        {
          message: "should equal to 'a '",
        },
      ],
    },
  ],
})
