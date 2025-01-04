export const interpolate = (
  text: string,
  variables?: Record<string, string> | undefined
) => {
  // Escape the '{{' and '}}' by replacing them with temporary placeholders
  text = text.replace(/{{/g, "{ESCAPED_OPEN_BRACE}");
  text = text.replace(/}}/g, "{ESCAPED_CLOSE_BRACE}");

  // Replace the variables in the text using the format {varname}
  text = text.replace(/{(.*?)}/g, (match, varName) => {
    // Replace the placeholder with the correct variable value, or leave it unchanged if not found
    return variables && variables[varName] ? variables[varName] : match;
  });

  // Restore the escaped '{{' and '}}' to '{' and '}'
  text = text.replace(/{ESCAPED_OPEN_BRACE}/g, "{");
  text = text.replace(/{ESCAPED_CLOSE_BRACE}/g, "}");

  return text;
};
