import { isRepeatedDigits, onlyDigits } from "./helpers";
import { MaskOptions } from "./types";

const CNPJ_LEN = 14;

function validaCNPJ(cnpj: string): number {
	const len = cnpj.length;
	if (len !== 12 && len !== 13) return 0;

	const weights =
		len === 12
			? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
			: [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

	let sum = 0;

	for (let i = 0; i < len; i++) {
		const digit = cnpj.charCodeAt(i) - 48;
		if (digit < 0 || digit > 9) return 0;

		const weight = weights[i] ?? 0;
		sum += digit * weight;
	}

	const mod = sum % 11;
	return mod < 2 ? 0 : 11 - mod;
}

/**
 * Aplica máscara de CNPJ ao valor informado.
 *
 * @param input - String de entrada que pode conter quaisquer caracteres; apenas dígitos serão considerados.
 * @param opts - Opções de formatação. Se `pad` for verdadeiro, completa com zeros à esquerda até 14 dígitos.
 * @returns CNPJ formatado no padrão `00.000.000/0000-00`.
 */
export function cnpjMask(input: string, opts: MaskOptions = {}): string {
	const digits = onlyDigits(input);
	const d = opts.pad ? digits.padStart(CNPJ_LEN, "0").slice(-CNPJ_LEN) : digits;

	const p1 = d.slice(0, 2);
	const p2 = d.slice(2, 5);
	const p3 = d.slice(5, 8);
	const p4 = d.slice(8, 12);
	const p5 = d.slice(12, 14);

	let out = p1;
	if (p2) out += `.${p2}`;
	if (p3) out += `.${p3}`;
	if (p4) out += `/${p4}`;
	if (p5) out += `-${p5}`;
	return out;
}

/**
 * Valida um CNPJ informado como string.
 *
 * Remove caracteres não numéricos, verifica tamanho, repetição de dígitos
 * e calcula os dígitos verificadores.
 *
 * @param input - CNPJ a ser validado (pode conter máscara ou apenas números).
 * @returns `true` se o CNPJ for válido; caso contrário, `false`.
 */
export function cnpjIsValid(input: string): boolean {
	const digits = onlyDigits(input);
	if (digits.length !== CNPJ_LEN) return false;
	if (isRepeatedDigits(digits)) return false;

	const base12 = digits.slice(0, 12);
	const dv1 = validaCNPJ(base12);
	const base13 = base12 + String(dv1);
	const dv2 = validaCNPJ(base13);

	return digits === base12 + String(dv1) + String(dv2);
}

/**
 * Formata uma string como CNPJ, aplicando máscara e opções de preenchimento.
 *
 * @param input - Texto de entrada contendo dígitos do CNPJ (com ou sem formatação).
 * @param opts - Opções de máscara (ex.: padding). Se `opts.pad` for falso e o total de dígitos
 * não for igual ao comprimento esperado, a máscara é aplicada conforme disponível.
 * @returns CNPJ formatado de acordo com a máscara e opções informadas.
 */
export function cnpjFormat(input: string, opts: MaskOptions = {}): string {
	const digits = onlyDigits(input);
	if (!opts.pad && digits.length !== CNPJ_LEN) return cnpjMask(digits, opts);
	return cnpjMask(digits, opts);
}
