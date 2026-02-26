export function onlyDigits(value: string): string {
	if (!value) return "";
	return value.replace(/\D+/g, "");
}

export function isRepeatedDigits(value: string): boolean {
	return /^(\d)\1+$/.test(value);
}

export function isRepeatedAlphanumeric(value: string): boolean {
	return /^(.)\1+$/.test(value);
}

export function removeSpecialCharacters(value: string): string {
	return value.replace(/[^A-Z0-9]/gi, "").toUpperCase();
}
