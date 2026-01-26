import { onlyDigits } from "./helpers";
import { MaskOptions } from "./types";

const CEP_LEN = 8;

export function cepMask(input: string, opts: MaskOptions = {}): string {
	const digits = onlyDigits(input);
	const d = opts.pad ? digits.padStart(CEP_LEN, "0").slice(-CEP_LEN) : digits;

	const p1 = d.slice(0, 5);
	const p2 = d.slice(5, 8);

	let out = p1;
	if (p2) out += `-${p2}`;
	return out;
}

export function cepIsValid(input: string): boolean {
	const d = onlyDigits(input);
	return d.length === CEP_LEN;
}

export function cepFormat(input: string, opts: MaskOptions = {}): string {
	const d = onlyDigits(input);
	if (!opts.pad && d.length !== CEP_LEN) return cepMask(d, opts);
	return cepMask(d, opts);
}
