export function baseStyles(prefix: string) {
  return {
    color: `hsl(var(--${prefix}-foreground))`,
    backgroundColor: `hsl(var(--${prefix}-background))`,
  }
}
