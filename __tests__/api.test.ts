import { isRepeatedDigits, onlyDigits } from "../src/helpers";
import {
  cepFormat,
  cepIsValid,
  cepMask,
  cnpjFormat,
  cnpjIsValid,
  cnpjMask,
  cpfFormat,
  cpfIsValid,
  cpfMask,
} from "../src/index";

const VALID_CPF = "52998224725";
const VALID_CNPJ = "33000167000101";
const VALID_CEP = "01001000";

const CNPJ_FORMATTED = "33.000.167/0001-01";
const REPEATED_DIGITS_CNPJ = "11111111111111";

describe("API exports", () => {
  it("Should export are main functions", () => {
    expect(typeof cpfMask).toBe("function");
    expect(typeof cpfFormat).toBe("function");
    expect(typeof cpfIsValid).toBe("function");

    expect(typeof cnpjMask).toBe("function");
    expect(typeof cnpjFormat).toBe("function");
    expect(typeof cnpjIsValid).toBe("function");

    expect(typeof cepMask).toBe("function");
    expect(typeof cepFormat).toBe("function");
    expect(typeof cepIsValid).toBe("function");
  });
});

describe("Return of utility functions", () => {
  it("should onlyDigits remove non-numeric characters", () => {
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
    expect(cpfMask(VALID_CPF)).toBe("529.982.247-25");
    expect(cpfMask("529982247")).toBe("529.982.247");
  });

  it("Should formatted correctly", () => {
    expect(cpfFormat("529.982.247-25")).toBe("529.982.247-25");
    expect(cpfFormat("1", { pad: true })).toBe("000.000.000-01");
  });

  it("Should validate correctly", () => {
    expect(cpfIsValid(VALID_CPF)).toBe(true);
    expect(cpfIsValid("11111111111")).toBe(false);
    expect(cpfIsValid("52998224724")).toBe(false);
  });
});

describe("CNPJ", () => {
  it("Should mask correctly", () => {
    expect(cnpjMask(VALID_CNPJ)).toBe("33.000.167/0001-01");
    expect(cnpjMask("042520110001")).toBe("04.252.011/0001");
  });

  it("Should formatted correctly", () => {
    expect(cnpjFormat("33.000.167/0001-01")).toBe("33.000.167/0001-01");
    expect(cnpjFormat("1", { pad: true })).toBe("00.000.000/0000-01");
  });

  it("Should validate correctly", () => {
    expect(cnpjIsValid(VALID_CNPJ)).toBe(true);
    expect(cnpjIsValid("00000000000000")).toBe(false);
    expect(cnpjIsValid("04252011000111")).toBe(false);
  });
});

describe("CEP", () => {
  it("Should mask correctly", () => {
    expect(cepMask(VALID_CEP)).toBe("01001-000");
    expect(cepMask("01001")).toBe("01001");
  });

  it("Should formatted correctly", () => {
    expect(cepFormat("01001-000")).toBe("01001-000");
    expect(cepFormat("1", { pad: true })).toBe("00000-001");
  });

  it("Should validate correctly", () => {
    expect(cepIsValid(VALID_CEP)).toBe(true);
    expect(cepIsValid("123")).toBe(false);
  });
});
