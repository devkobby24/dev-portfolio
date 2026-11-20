/**
 * A text input's submitted value. Throws when the form has no text field by
 * that name: that is a bug in the form's markup, not something to default.
 */
export const readTextField = (formData: FormData, fieldName: string): string => {
  const fieldValue = formData.get(fieldName);
  if (typeof fieldValue !== "string") {
    throw new Error(`The form has no text field named "${fieldName}".`);
  }
  return fieldValue;
};
