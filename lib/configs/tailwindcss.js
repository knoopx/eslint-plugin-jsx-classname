const TAILWINDCSS = [
  // layout
  "container",
  "decoration-",
  "box-",
  "block|inline-block|inline|flex|inline-flex|table|table-caption|table-cell|table-column|table-column-group|table-footer-group|table-header-group|table-row-group|table-row|flow-root|grid|inline-grid|contents|hidden",
  "float-|clear-",
  "isolate",
  "object-",
  "overflow-",
  "overscroll-",
  "static|fixed|absolute|relative|sticky",
  "(inset|top|right|bottom|left)-",
  "visible|invisible",
  "z-",

  // flexbox
  "flex-",
  "order-",

  // grid
  "grid-",
  "auto-(cols|rows)|(col|row|gap)-",

  // box alignment
  "justify-|content-|items-|self-|place-|order-",

  // spacing
  "-?(m|p|space)[lbtrxy]?-",

  // sizing
  "((max|min)-)?(w|h)-",

  // typography
  "font-(sans|serif|mono)",
  "font-",
  "antialiased|subpixel-antialiased",
  "italic|not-italic",
  "normal-nums|ordinal|slashed-zero|lining-nums|oldstyle-nums|proportional-nums|tabular-nums|diagonal-fractions|stacked-fractions",
  "(tracking|leading)-",
  "list-",
  "placeholder-",
  "text-left|text-center|text-right|text-justify",
  "text-opacity",
  "text-",
  "underline|line-through|no-underline",
  "uppercase|lowercase|capitalize|normal-case",
  "truncate|overflow-ellipsis|overflow-clip",
  "align-",
  "whitespace",
  "break-",

  // background

  "bg-fixed|bg-local|bg-scroll",
  "bg-clip-",
  "bg-opacity",
  "bg-bottom|bg-center|bg-left|bg-left-bottom|bg-left-top|bg-right|bg-right-bottom|bg-right-top|bg-top",
  "bg-repeat|bg-no-repeat|bg-repeat-x|bg-repeat-y|bg-repeat-round|bg-repeat-space",
  "bg-auto|bg-cover|bg-contain|bg-none",
  "bg-gradient-|from-|via-|to",
  "bg-",

  // borders

  "rounded-?", // radius
  "border-([trbl])?|border-([trbl]-)?(\\d)", // width
  "border-opacity-",
  "border-solid|border-dashed|border-dotted|border-double|border-none",
  "border",
  "divide",
  "ring",

  // effects

  "shadow",
  "opacity",
  "mix-blend",
  "bg-blend",

  // filters
  "(backdrop-)?(filter|blur|brightness|contrast|drop-shadow|grayscale|hue-rotate|invert|saturate|sepia)",

  // tables
  "border-collapse|border-separate",
  "table-auto|table-fixed",

  // transitions

  "transition|duration|ease-linear|ease-in|ease-out|ease-in-out|delay-|animate-",

  // transforms
  "transform|origin-|scale-|rotate-|translate-|skew-",

  // interactivity
  "appearance-none",
  "cursor-",
  "outline-",
  "pointer-events-",
  "resize|resize-",
  "select-",

  "sr-only|not-sr-only",
]

module.exports = TAILWINDCSS.reduce(
  (res, key) => [
    ...res,
    `^${key}`,
    `.+:${key}`, // variants after
  ],
  [],
)
