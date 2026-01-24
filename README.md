# brazil-formatter

Lib simples e leve para **formatação** e **validação** de documentos brasileiros: **CPF**, **CNPJ** e **CEP**.

## Instalação

```bash
npm install brazil-formatter
```

ou

```bash
yarn add brazil-formatter
```

ou

```bash
pnpm add brazil-formatter
```

## Uso rápido

```ts
import {
  cpfMask,
  cpfFormat,
  cpfIsValid,
  cnpjMask,
  cnpjFormat,
  cnpjIsValid,
  cepMask,
  cepFormat,
  cepIsValid,
} from "brazil-formatter";

cpfMask("12345678901"); // "123.456.789-01"
cpfIsValid("123.456.789-09"); // false

cnpjMask("12345678000195"); // "12.345.678/0001-95"
cnpjIsValid("12.345.678/0001-95"); // true

cepMask("01001000"); // "01001-000"
cepIsValid("01001-000"); // true
```

## API

### CPF

- `cpfMask(input, opts?)`
  - Aplica máscara em qualquer entrada (com ou sem caracteres não numéricos).
  - Retorna uma string parcialmente mascarada caso o input tenha poucos dígitos.

- `cpfFormat(input, opts?)`
  - Formata o CPF. Quando `pad` estiver desativado, a formatação parcial é mantida.

- `cpfIsValid(input)`
  - Valida o CPF considerando dígitos verificadores.
  - Rejeita CPFs com dígitos repetidos (ex.: "11111111111").

### CNPJ

- `cnpjMask(input, opts?)`
  - Aplica máscara em qualquer entrada.
  - Retorna string parcialmente mascarada quando faltam dígitos.

- `cnpjFormat(input, opts?)`
  - Formata o CNPJ. Quando `pad` estiver desativado, a formatação parcial é mantida.

- `cnpjIsValid(input)`
  - Valida o CNPJ considerando dígitos verificadores.
  - Rejeita CNPJs com dígitos repetidos.

### CEP

- `cepMask(input, opts?)`
  - Aplica máscara em qualquer entrada.

- `cepFormat(input, opts?)`
  - Formata o CEP. Quando `pad` estiver desativado, a formatação parcial é mantida.

- `cepIsValid(input)`
  - Valida se possui exatamente 8 dígitos.

## Opções

### `MaskOptions`

```ts
type MaskOptions = {
  pad?: boolean;
};
```

- `pad`: quando `true`, completa com zeros à esquerda para atingir o tamanho esperado:
  - CPF: 11 dígitos
  - CNPJ: 14 dígitos
  - CEP: 8 dígitos

## Exemplos

### Formatação com `pad`

```ts
cpfMask("123", { pad: true }); // "000.000.001-23"
cnpjMask("123", { pad: true }); // "00.000.000/0001-23"
cepMask("123", { pad: true }); // "00001-23"
```

### Formatação parcial (sem `pad`)

```ts
cpfMask("123"); // "123"
cpfMask("1234"); // "123.4"
cpfMask("1234567890"); // "123.456.789-0"
```

### Validação

```ts
cpfIsValid("529.982.247-25"); // true
cnpjIsValid("45.723.174/0001-10"); // true
cepIsValid("01001-000"); // true
```

## Licença

MIT

