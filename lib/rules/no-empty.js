const { wrapString, unwrapString } = require("../support");

module.exports = {
  meta: {
    docs: {
      description: "Enforce no empty JSX className attribute",
      category: "Stylistic Issues",
      recommended: true
    },
    fixable: "code",
    schema: []
  },

  create: function(context) {
    const source = context.getSourceCode();

    function report(node) {
      context.report({
        node: node,
        message: `no empty className allowed`,
        fix: fixer => fixer.remove(node)
      });
    }

    return {
      [["JSXAttribute[name.name='className']"].join(",")]: node => {
        if (node.value.type === "Literal" && !node.value.value.trim()) {
          report(node);
          return
        } else if (node.value.type === "JSXExpressionContainer") {
          if (
            (node.value.expression.type === "Literal" && !node.value.expression.value.trim()) ||
            (node.value.expression.type === "TemplateLiteral" && !node.value.expression.quasis.map(x => x.value.raw).join("").trim()
          )) {
            report(node);
          }
        }
      }
    };
  }
};
