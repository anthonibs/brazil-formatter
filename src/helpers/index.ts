export function onlyDigits(value: string): string {
  if (!value) return "";
  return value.replace(/\D+/g, "");
}

export function isRepeatedDigits(value: string): boolean {
  return /^(\d)\1+$/.test(value);
}
