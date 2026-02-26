import { onlyDigits } from "./helpers";
import { MaskOptions } from "./interfaces";

const PHONE_LEN = 11;

function normalizePhoneDigits(input: string, opts: MaskOptions = {}): string {
	let digits = onlyDigits(input);

	if (digits.length > PHONE_LEN && digits.startsWith("55")) {
		digits = digits.slice(2);
	}

	if (opts.pad) {
		return digits.padStart(PHONE_LEN, "0").slice(-PHONE_LEN);
	}

	return digits.slice(0, PHONE_LEN);
}

/**
 * Aplica máscara brasileira de telefone no padrão (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.
 *
 * @param input - Entrada com dígitos ou caracteres misturados.
 * @param opts - Opções de máscara.
 * @returns Telefone formatado com DDD e traço.
 */
export function maskPhone(input: string, opts: MaskOptions = {}): string {
	const digits = normalizePhoneDigits(input, opts);

	if (!digits) return "";

	if (digits.length <= 2) {
		return `(${digits}`;
	}
	if (digits.length <= 6) {
		return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
	}
	if (digits.length <= 10) {
		return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
	}

	return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

/**
 * Formata um telefone com base nas opções de máscara informadas.
 *
 * @param input - Texto de entrada que pode conter dígitos e outros caracteres.
 * @param opts - Opções de máscara que controlam o formato (por exemplo, preenchimento).
 * @returns Telefone formatado conforme as opções de máscara.
 */
export const formatPhone = maskPhone;
