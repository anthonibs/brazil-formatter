import { isRepeatedDigits, onlyDigits } from "./helpers";
import { MaskOptions } from "./types";

const CNPJ_LEN = 14;

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

function cnpjCalcCheckDigit(base: string): number {
  const len = base.length;
  if (len !== 12 && len !== 13) return 0;

  const startWeight = len === 12 ? 5 : 6;
  let sum = 0;

  for (let i = 0; i < len; i++) {
    const digit = base.charCodeAt(i) - 48;
    if (digit < 0 || digit > 9) return 0;

    const weight = ((startWeight + 10 - i) % 8) + 2;
    sum += digit * weight;
  }

  const mod = sum % 11;
  return mod < 2 ? 0 : 11 - mod;
}

export function cnpjIsValid(input: string): boolean {
  const digits = onlyDigits(input);
  if (digits.length !== CNPJ_LEN) return false;
  if (isRepeatedDigits(digits)) return false;

  const base12 = digits.slice(0, 12);
  const dv1 = cnpjCalcCheckDigit(base12);
  const base13 = base12 + String(dv1);
  const dv2 = cnpjCalcCheckDigit(base13);

  return digits === base12 + String(dv1) + String(dv2);
}

export function cnpjFormat(input: string, opts: MaskOptions = {}): string {
  const digits = onlyDigits(input);
  if (!opts.pad && digits.length !== CNPJ_LEN) return cnpjMask(digits, opts);
  return cnpjMask(digits, opts);
}
