import { isRepeatedDigits, onlyDigits } from "./helpers";
import { MaskOptions } from "./types";

const CPF_LEN = 11;

export function cpfMask(input: string, opts: MaskOptions = {}): string {
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

function cpfCalcCheckDigit(base9or10: string): number {
  let sum = 0;
  const len = base9or10.length;
  let weight = len + 1;

  for (let i = 0; i < len; i++) {
    sum += Number(base9or10[i]) * weight--;
  }
  const mod = sum % 11;
  return mod < 2 ? 0 : 11 - mod;
}

export function cpfIsValid(input: string): boolean {
  const d = onlyDigits(input);
  if (d.length !== CPF_LEN) return false;
  if (isRepeatedDigits(d)) return false;

  const base9 = d.slice(0, 9);
  const dv1 = cpfCalcCheckDigit(base9);
  const base10 = base9 + String(dv1);
  const dv2 = cpfCalcCheckDigit(base10);

  return d === base9 + String(dv1) + String(dv2);
}

export function cpfFormat(input: string, opts: MaskOptions = {}): string {
  const digits = onlyDigits(input);
  if (!opts.pad && digits.length !== CPF_LEN) return cpfMask(digits, opts);
  return cpfMask(digits, opts);
}
