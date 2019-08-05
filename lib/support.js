function unwrapString(value) {
  if (value[0] == [value[value.length - 1]]) {
    return [value.slice(1, -1), value[0]];
  }
  return [value, ""];
}

function wrapString(char, replacement) {
  return char + replacement + char;
}

function buildCalleeSelectors(calleeNames) {
  return calleeNames.reduce(
    (result, name) => [
      ...result,
      `CallExpression[callee.name="${name}"] > Literal`,
      `CallExpression[callee.name="${name}"] > TemplateLiteral`,
      `CallExpression[callee.name="${name}"] ArrayExpression > Literal`,
      `CallExpression[callee.name="${name}"] ArrayExpression > TemplateLiteral`,
      `CallExpression[callee.name="${name}"] Property > .key[type="Literal"]`,
      `CallExpression[callee.name="${name}"] Property > .key[type="TemplateLiteral"]`
    ],
    []
  );
}

function buildSelectors(calleeNames = []) {
  return [
    "JSXAttribute[name.name='className'] > Literal",
    "JSXAttribute[name.name='className'] JSXExpressionContainer > Literal",
    "JSXAttribute[name.name='className'] JSXExpressionContainer > TemplateLiteral",
    "JSXAttribute[name.name='className'] ArrayExpression > Literal",
    "JSXAttribute[name.name='className'] ArrayExpression > TemplateLiteral",
    ...buildCalleeSelectors(calleeNames)
  ]
}

module.exports = { unwrapString, wrapString, buildSelectors };
