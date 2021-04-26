const { RuleTester } = require("eslint")

const rule = require("../../../lib/rules/no-empty")

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

ruleTester.run("no-empty", rule, {
  valid: [
    { code: '<div className="x" />' },
    { code: '<div className={"x"} />' },
    { code: "<div className={`x`} />" },
  ],
  invalid: [
    {
      code: '<div className="" />',
      output: "<div  />",
      errors: [
        {
          message: "no empty className allowed",
        },
      ],
    },
    {
      code: '<div className={""} />',
      output: "<div  />",
      errors: [
        {
          message: "no empty className allowed",
        },
      ],
    },
    {
      code: "<div className={``} />",
      output: "<div  />",
      errors: [
        {
          message: "no empty className allowed",
        },
      ],
    },
  ],
})
