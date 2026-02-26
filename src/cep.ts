import { onlyDigits } from "./helpers";
import { MaskOptions } from "./interfaces";

const CEP_LEN = 8;

/**
 * Aplica máscara de CEP (#####-###) ao valor informado.
 *
 * @param input - Texto de entrada contendo dígitos (outros caracteres são ignorados).
 * @param opts - Opções de formatação.
 * @param opts.pad - Quando `true`, preenche com zeros à esquerda até 8 dígitos.
 * @returns CEP formatado no padrão `#####-###`.
 */
export function maskCEP(input: string, opts: MaskOptions = {}): string {
	const digits = onlyDigits(input);
	const d = opts.pad ? digits.padStart(CEP_LEN, "0").slice(-CEP_LEN) : digits;

	const p1 = d.slice(0, 5);
	const p2 = d.slice(5, 8);

	let out = p1;
	if (p2) out += `-${p2}`;
	return out;
}

/**
 * Valida se a entrada possui o comprimento esperado para um CEP após remover caracteres não numéricos.
 *
 * @param input - String contendo o CEP (pode incluir caracteres não numéricos).
 * @returns `true` se, após manter apenas dígitos, o CEP tiver o comprimento esperado; caso contrário, `false`.
 */
export function isValidCEP(input: string): boolean {
	const d = onlyDigits(input);
	return d.length === CEP_LEN;
}

/**
 * Formata um CEP (Código de Endereçamento Postal) usando as opções de máscara informadas.
 *
 * @param input - String de entrada contendo o CEP a ser formatado.
 * @param opts - Opções de máscara que controlam preenchimento e formatação.
 * @returns CEP formatado.
 */
export const formatCEP = maskCEP;
