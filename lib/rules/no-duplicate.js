const { uniq } = require("lodash")

const { wrapString, unwrapString, buildSelectors } = require("../support")

module.exports = {
  meta: {
    docs: {
      description: "Enforce no duplicates within JSX className attribute",
      category: "Stylistic Issues",
      recommended: true,
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          callee: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const options = context.options[0] || {}
    const callee = options.callee || []
    const source = context.getSourceCode()

    return {
      [buildSelectors(callee).join(",")]: (node) => {
        const [actual, char] = unwrapString(source.getText(node))
        const array = actual.trim().split(/\s+/)

        const dupes = uniq(
          array.filter((v) => array.filter((v1) => v1 === v).length > 1),
        )
        const tokens = actual.split(/\s/)
        for (const dupe of dupes) {
          while (tokens.filter((t) => t === dupe).length > 1) {
            tokens.splice(tokens.lastIndexOf(dupe), 1)
          }
        }
        const expected = tokens.join(" ")

        if (dupes.length > 0) {
          context.report({
            node,
            message: `should equal to '${expected}'`,
            fix: (fixer) => fixer.replaceText(node, wrapString(char, expected)),
          })
        }
      },
    }
  },
}
