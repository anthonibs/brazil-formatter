import { isRepeatedAlphanumeric, removeSpecialCharacters } from "./helpers";
import { MaskOptions } from "./interfaces";

const CNPJ_LEN = 14;
const WEIGHTS: [number[], number[]] = [
	[5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
	[6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
];

const sanitize = (value: string) =>
	removeSpecialCharacters(value).slice(0, CNPJ_LEN);

const calcDigit = (value: string, step: 0 | 1): number => {
	const weights = WEIGHTS[step];
	const sum = value.split("").reduce((acc, d, i) => {
		const charValue = d.charCodeAt(0) - 48;
		return acc + charValue * (weights[i] ?? 0);
	}, 0);

	const mod = sum % 11;
	return mod < 2 ? 0 : 11 - mod;
};

/**
 * Formata um CNPJ aplicando a máscara padrão "00.000.000/0000-00".
 *
 * Recebe uma string que pode conter dígitos e caracteres de formatação; caracteres não numéricos são removidos
 * antes da formatação. Se a opção `opts.pad` for verdadeira, o valor será preenchido à esquerda com zeros
 * até completar os 14 dígitos do CNPJ.
 *
 * @param input - Valor de entrada que representa o CNPJ (pode conter formatação).
 * @param opts - Opções de máscara (por exemplo, `{ pad?: boolean }`).
 * @returns CNPJ formatado com pontos, barra e hífen (ex.: "11.222.333/0001-81"). Retorna string vazia se não houver dígitos.
 *
 * @example
 * // maskCNPJ("11222333000181") -> "11.222.333/0001-81"
 * @public
 */
export const maskCNPJ = (input: string, opts: MaskOptions = {}): string => {
	let v = sanitize(input);
	if (opts.pad) v = v.padStart(CNPJ_LEN, "0").slice(-CNPJ_LEN);

	const p1 = v.slice(0, 2);
	const p2 = v.slice(2, 5);
	const p3 = v.slice(5, 8);
	const p4 = v.slice(8, 12);
	const p5 = v.slice(12, 14);

	return [p1, p2 && `.${p2}`, p3 && `.${p3}`, p4 && `/${p4}`, p5 && `-${p5}`]
		.filter(Boolean)
		.join("");
};

/**
 * Verifica se a string fornecida é um CNPJ válido.
 *
 * A validação ignora caracteres não alfanuméricos, verifica se há 14 dígitos e valida os dígitos verificadores
 * conforme as regras oficiais do CNPJ.
 *
 * @param input - Valor que será validado como CNPJ (pode conter formatação).
 * @returns `true` se o CNPJ for válido; `false` caso contrário.
 *
 * @example
 * // isValidCNPJ("11.222.333/0001-81") -> true
 * @public
 */
export const isValidCNPJ = (input: string): boolean => {
	const raw = removeSpecialCharacters(input).toUpperCase();

	const v = sanitize(raw);

	if (v.length !== CNPJ_LEN || isRepeatedAlphanumeric(v)) return false;

	if (!/^\d{2}$/.test(v.slice(12))) return false;

	const base12 = v.slice(0, 12);
	const d1 = calcDigit(base12, 0);
	const d2 = calcDigit(base12 + d1, 1);

	return v === base12 + d1 + d2;
};

/**
 * Retorna a representação "limpa" (apenas dígitos) de um CNPJ.
 *
 * Remove todos os caracteres não alfanuméricos da entrada. Se a opção `opts.pad` for verdadeira, preenche à esquerda com zeros
 * até atingir 14 dígitos. Útil para normalizar valores antes de persistir ou validar.
 *
 * @param input - Valor de entrada que representa o CNPJ.
 * @param opts - Opções de formatação/normalização (por exemplo, `{ pad?: boolean }`).
 * @returns String contendo apenas os dígitos do CNPJ (normalmente 14 caracteres após padding).
 *
 * @example
 * // formatCNPJ("11.222.333/0001-81") -> "11222333000181"
 * @public
 */
export const formatCNPJ = maskCNPJ;
