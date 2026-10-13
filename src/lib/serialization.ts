// Keep CMS content inside JSON script tags and well-formed XML text nodes.
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function escapeXml(value: string): string {
  return value.replace(/[<>&"']/g, (character) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;",
  })[character]!);
}
