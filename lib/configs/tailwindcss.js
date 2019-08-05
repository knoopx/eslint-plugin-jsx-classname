const TAILWINDCSS = [
  "appearance-none",
  "pointer-events-",
  "(outline|cursor|select)-",
  "resize",
  "(list|object|table)-",
  "static|fixed|absolute|relative|sticky",
  "(inset|top|right|bottom|left|z)-",
  "block|inline-block|inline|flex|inline-flex|table|table-row|table-cell|hidden",
  "(flex|items|self|justify|content|order)-",
  "float-|clearfix:after",
  "(overflow|scrolling)-",
  "((max|min)-)?(w|h)-",
  "-?(m|p)[lbtrxy]?-",
  "(border|rounded|shadow|opacity)",
  "(bg|text)-",
  "(fill|stroke)-current",
  "font-",
  "italic|not-italic",
  "uppercase|lowercase|capitalize|normal-case",
  "underline|line-through|no-underline",
  "align-",
  "(leading|tracking)-",
  "whitespace-",
  "break-|truncate",
  "(subpixel-)?antialiased",
  "(in)?visible",
]

module.exports = TAILWINDCSS.reduce((res, key) => [
  ...res,
  `^${key}`,
  `.+:${key}`, // variants after
], [])
