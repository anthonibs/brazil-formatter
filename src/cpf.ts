import { isRepeatedDigits, onlyDigits } from "./helpers";
import { MaskOptions } from "./interfaces";

const CPF_LEN = 11;

/**
 * Aplica a máscara de CPF a uma string, mantendo apenas dígitos e formatando
 * no padrão `000.000.000-00`.
 *
 * @param input - Texto de entrada que pode conter caracteres não numéricos.
 * @param opts - Opções de formatação (por exemplo, `pad` para preencher com zeros à esquerda).
 * @returns CPF formatado com máscara.
 */
export function maskCPF(input: string, opts: MaskOptions = {}): string {
	const digits = onlyDigits(input);
	const d = opts.pad ? digits.padStart(CPF_LEN, "0").slice(-CPF_LEN) : digits;

	const p1 = d.slice(0, 3);
	const p2 = d.slice(3, 6);
	const p3 = d.slice(6, 9);
	const p4 = d.slice(9, 11);

	let out = p1;
	if (p2) out += `.${p2}`;
	if (p3) out += `.${p3}`;
	if (p4) out += `-${p4}`;
	return out;
}

function calcDigit(base9or10: string): number {
	let sum = 0;
	const len = base9or10.length;
	let weight = len + 1;

	for (let i = 0; i < len; i++) {
		sum += Number(base9or10[i]) * weight--;
	}
	const mod = sum % 11;
	return mod < 2 ? 0 : 11 - mod;
}

/**
 * Valida um CPF verificando comprimento, repetição de dígitos e dígitos verificadores.
 *
 * @param input - String contendo o CPF (com ou sem formatação).
 * @returns `true` se o CPF for válido; caso contrário, `false`.
 */
export function isValidCPF(input: string): boolean {
	const d = onlyDigits(input);
	if (d.length !== CPF_LEN) return false;
	if (isRepeatedDigits(d)) return false;

	const base9 = d.slice(0, 9);
	const dv1 = calcDigit(base9);
	const base10 = base9 + String(dv1);
	const dv2 = calcDigit(base10);

	return d === base9 + String(dv1) + String(dv2);
}

/**
 * Formata um CPF com base nas opções de máscara informadas.
 *
 * @param input - Texto de entrada que pode conter dígitos e outros caracteres.
 * @param opts - Opções de máscara que controlam o formato (por exemplo, preenchimento).
 * @returns CPF formatado conforme as opções de máscara.
 */
export const formatCPF = maskCPF;
