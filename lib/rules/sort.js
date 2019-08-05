const { isMatch } = require("lodash");
const { wrapString, unwrapString, buildSelectors } = require("../support");

function getIndex(order, value) {
  for (let i = 0; i < order.length; i++) {
    let regex;
    const isFullRegex = order[i].match(/\/(.*)\/([g|y|i|m]*)/);

    if (isFullRegex) {
      regex = new RegExp(isFullRegex[1], isFullRegex[2]);
    } else {
      regex = new RegExp(order[i]);
    }

    const match = regex.exec(value);

    if (match) {
      return i;
    }
  }
  return Infinity;
}

const tokenizeAndSort = (className, order) => {
  const unorderedTokens = className.split(" ");
  const orderedTokens = className
    .trim()
    .split(/\s+/)
    .sort((a, b) => {
      const indexA = getIndex(order, a);
      const indexB = getIndex(order, b);

      if (indexA === indexB) {
        return a.localeCompare(b);
      } else {
        return indexA - indexB;
      }
    });
  return unorderedTokens
    .map(token => (!token ? token : orderedTokens.shift()))
    .join(" ");
};

module.exports = {
  meta: {
    docs: {
      description: "Enforce JSX className attribute order",
      category: "Stylistic Issues",
      recommended: true
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          order: {
            type: "array",
            items: {
              type: "string"
            }
          },
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
    const order = options.order || [];
    const callee = options.callee || [];
    const source = context.getSourceCode();

    return {
      [buildSelectors(callee).join(",")]: node => {
        const [actual, char] = unwrapString(source.getText(node));
        const expected = tokenizeAndSort(actual, order);
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
