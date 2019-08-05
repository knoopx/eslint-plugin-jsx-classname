const { wrapString, unwrapString, buildSelectors } = require("../support");

module.exports = {
  meta: {
    docs: {
      description: "Enforce no whitespace within JSX className attribute",
      category: "Stylistic Issues",
      recommended: true
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          callee: {
            type: "array",
            items: {
              "type": "string"
            }
          }
        },
        additionalProperties: false
      }
    ]
  },

  create: function(context) {
    const options = context.options[0] || {};
    const callee = options.callee || [];
    const source = context.getSourceCode();

    return {
      [buildSelectors(callee).join(",")]: node => {
        const [actual, char] = unwrapString(source.getText(node));
        const expected = actual.trim().split(/\s+/).join(" ");
        if (actual !== expected) {
          context.report({
            node: node,
            message: `should equal to '${expected}'`,
            fix: fixer => fixer.replaceText(node, wrapString(char, expected))
          });
        }
      }
    };
  }
};
