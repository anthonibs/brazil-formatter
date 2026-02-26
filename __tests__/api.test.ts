import { describe, expect, it } from "@jest/globals";

import { isRepeatedDigits, onlyDigits } from "../src/helpers";
import {
	formatCEP,
	isValidCEP,
	maskCEP,
	formatCNPJ,
	isValidCNPJ,
	maskCNPJ,
	formatCPF,
	isValidCPF,
	maskCPF,
	formatPhone,
	maskPhone,
} from "../src/index";

const VALID_CPF = "52998224725";
const VALID_CNPJ = "29153853000145";
const VALID_CNPJ_NUMERIC = "RZ0TNWKC000110";
const VALID_CEP = "01001000";
const VALID_MOBILE_PHONE = "11987654321";
const VALID_LANDLINE_PHONE = "1133224455";

const CNPJ_FORMATTED = "33.000.167/0001-01";
const REPEATED_DIGITS_CNPJ = "11111111111111";

describe("API exports", () => {
	it("Should export all main functions", () => {
		expect(typeof maskCPF).toBe("function");
		expect(typeof formatCPF).toBe("function");
		expect(typeof isValidCPF).toBe("function");

		expect(typeof maskCNPJ).toBe("function");
		expect(typeof formatCNPJ).toBe("function");
		expect(typeof isValidCNPJ).toBe("function");

		expect(typeof maskCEP).toBe("function");
		expect(typeof formatCEP).toBe("function");
		expect(typeof isValidCEP).toBe("function");

		expect(typeof maskPhone).toBe("function");
		expect(typeof formatPhone).toBe("function");
	});
});

describe("Return of utility functions", () => {
	it("Should onlyDigits remove non-numeric characters", () => {
		expect(onlyDigits(CNPJ_FORMATTED)).toBe("33000167000101");
		expect(onlyDigits(" 33.000.167/0001-01 ")).toBe("33000167000101");
		expect(onlyDigits("abc")).toBe("");
		expect(onlyDigits("123abc456")).toBe("123456");
	});

	it("Should isRepeatedDigits identify repetitions", () => {
		expect(isRepeatedDigits(REPEATED_DIGITS_CNPJ)).toBe(true);
		expect(isRepeatedDigits("00000000")).toBe(true);
		expect(isRepeatedDigits("11111111111110")).toBe(false);
		expect(isRepeatedDigits("1234567890")).toBe(false);
	});
});

describe("CPF", () => {
	it("Should mask correctly", () => {
		expect(maskCPF(VALID_CPF)).toBe("529.982.247-25");
		expect(maskCPF("529982247")).toBe("529.982.247");
	});

	it("Should format correctly", () => {
		expect(formatCPF("529.982.247-25")).toBe("529.982.247-25");
		expect(formatCPF("1", { pad: true })).toBe("000.000.000-01");
	});

	it("Should validate correctly", () => {
		expect(isValidCPF(VALID_CPF)).toBe(true);
		expect(isValidCPF("11111111111")).toBe(false);
		expect(isValidCPF("52998224724")).toBe(false);
	});
});

describe("CNPJ", () => {
	it("Should mask correctly", () => {
		expect(maskCNPJ(VALID_CNPJ)).toBe("29.153.853/0001-45");
		expect(maskCNPJ(VALID_CNPJ_NUMERIC)).toBe("RZ.0TN.WKC/0001-10");
		expect(maskCNPJ("042520110001")).toBe("04.252.011/0001");
	});

	it("Should format correctly", () => {
		expect(formatCNPJ("33.000.167/0001-01")).toBe("33.000.167/0001-01");
		expect(formatCNPJ("11214056062276")).toBe("11.214.056/0622-76");
		expect(formatCNPJ("05L896DZGLCP15")).toBe("05.L89.6DZ/GLCP-15");
		expect(formatCNPJ("1", { pad: true })).toBe("00.000.000/0000-01");
	});

	it("Should validate correctly", () => {
		expect(isValidCNPJ(VALID_CNPJ)).toBe(true);
		expect(isValidCNPJ("00000000000000")).toBe(false);
		expect(isValidCNPJ("04252011000111")).toBe(false);
	});
});

describe("CEP", () => {
	it("Should mask correctly", () => {
		expect(maskCEP(VALID_CEP)).toBe("01001-000");
		expect(maskCEP("01001")).toBe("01001");
	});

	it("Should format correctly", () => {
		expect(formatCEP("01001-000")).toBe("01001-000");
		expect(formatCEP("1", { pad: true })).toBe("00000-001");
	});

	it("Should validate correctly", () => {
		expect(isValidCEP(VALID_CEP)).toBe(true);
		expect(isValidCEP("123")).toBe(false);
	});
});

describe("Phone", () => {
	it("Should mask celular numbers", () => {
		expect(maskPhone(VALID_MOBILE_PHONE)).toBe("(11) 98765-4321");
	});

	it("Should mask fixo numbers", () => {
		expect(maskPhone(VALID_LANDLINE_PHONE)).toBe("(11) 3322-4455");
	});

	it("Should keep mask when formatting", () => {
		expect(formatPhone(VALID_MOBILE_PHONE)).toBe("(11) 98765-4321");
	});
});
