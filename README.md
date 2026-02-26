<img src="./herobanner-brazil.png" />

![GitHub License](https://img.shields.io/github/license/anthonibs/brazil-formatter)
![GitHub package.json version](https://img.shields.io/github/package-json/v/anthonibs/brazil-formatter)
![NPM Downloads](https://img.shields.io/npm/d18m/brazil-formatter)

# brazil-formatter

Lib simples e leve para **formatação** e **validação** de documentos brasileiros: **CPF**, **CNPJ**, **CEP** e **telefones**.

## Atenção — mudanças recentes

- Nomes das funções atualizados para seguir padrão consistente:
  - cpfMask -> maskCPF
  - cpfFormat -> formatCPF
  - cpfIsValid -> isValidCPF
  - cnpjMask -> maskCNPJ
  - cnpjFormat -> formatCNPJ
  - cnpjIsValid -> isValidCNPJ
  - cepMask -> maskCEP
  - cepFormat -> formatCEP
  - cepIsValid -> isValidCEP
  - phoneMask -> maskPhone
  - phoneFormat -> formatPhone

- A função `isValidCNPJ` foi atualizada para suportar o novo formato de CNPJ alfanumérico, em total conformidade com as regras recentes da Receita Federal.

## Instalação

```bash
npm install brazil-formatter
```

## Uso rápido

```ts
import {
	maskCPF,
	formatCPF,
	isValidCPF,
	maskCNPJ,
	formatCNPJ,
	isValidCNPJ,
	maskCEP,
	formatCEP,
	isValidCEP,
	maskPhone,
	formatPhone,
} from "brazil-formatter";

maskCPF("12345678901"); // "123.456.789-01"
isValidCPF("123.456.789-09"); // false

maskCNPJ("12345678000195"); // "12.345.678/0001-95"
isValidCNPJ("12.345.678/0001-95"); // true
maskCNPJ("05L896DZGLCP15"); // "05.L89.6DZ/GLCP-15" (exemplo alfanumérico)

maskCEP("01001000"); // "01001-000"
maskPhone("11987654321"); // "(11) 9 8765-4321"
formatPhone("1133224455"); // "(11) 3322-4455"
```

## Modelos de saída

Use como referência visual do formato final:

- CPF: `000.000.000-00`
- CNPJ: `00.000.000/0000-00`
- CEP: `00000-000`
- Phone: `(xx) xxxxx-xxxx` (celular) ou `(xx) xxxx-xxxx` (fixo)

## API

### CPF

- `maskCPF(input, opts?)`
  - Aplica máscara em qualquer entrada (com ou sem caracteres não numéricos).
  - Retorna uma string parcialmente mascarada caso o input tenha poucos dígitos.

- `formatCPF(input, opts?)`
  - Formata o CPF com o mesmo comportamento de `maskCPF`.
  - Quando `pad` estiver desativado, a formatação parcial é mantida.

- `isValidCPF(input)`
  - Valida o CPF considerando dígitos verificadores.
  - Rejeita CPFs com dígitos repetidos (ex.: "11111111111").

### CNPJ

- `maskCNPJ(input, opts?)`
  - Aplica máscara em qualquer entrada.
  - Retorna string parcialmente mascarada quando faltam dígitos.

- `formatCNPJ(input, opts?)`
  - Formata o CNPJ com o mesmo comportamento de `maskCNPJ`.
  - Quando `pad` estiver desativado, a formatação parcial é mantida.

- `isValidCNPJ(input)`
  - Valida o CNPJ considerando dígitos verificadores.
  - Rejeita CNPJs com dígitos repetidos.

### CEP

- `maskCEP(input, opts?)`
  - Aplica máscara em qualquer entrada.

- `formatCEP(input, opts?)`
  - Formata o CEP com o mesmo comportamento de `maskCEP`.
  - Quando `pad` estiver desativado, a formatação parcial é mantida.

- `isValidCEP(input)`
  - Valida se possui exatamente 8 dígitos.

### Phone

- `maskPhone(input, opts?)`
  - Remove caracteres não numéricos e aplica máscara `(xx) xxxxx-xxxx`, ajustando o bloco final
    para celulares ou telefones fixos conforme a quantidade de dígitos disponíveis.
  - Retorna representações parciais quando a entrada tiver poucos dígitos e respeita `pad`
    para completar até 11 dígitos.

- `formatPhone(input, opts?)`
  - Encapsula `maskPhone`, garantindo que a formatação padrão seja mantida.
  - Quando `pad` estiver desativado, aceita entradas com menos de 11 dígitos sem forçar o preenchimento completo.

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
  - Phone: 11 dígitos (DDD + celular ou fixo com zero à esquerda)

## Exemplos

### Formatação com `pad`

```ts
maskCPF("123", { pad: true }); // "000.000.001-23"
maskCNPJ("123", { pad: true }); // "00.000.000/0001-23"
maskCEP("123", { pad: true }); // "00001-23"
```

### Formatação parcial (sem `pad`)

```ts
maskCPF("123"); // "123"
maskCPF("1234"); // "123.4"
maskCPF("1234567890"); // "123.456.789-0"
```

### Validação

```ts
isValidCPF("529.982.247-25"); // true
isValidCNPJ("45.723.174/0001-10"); // true
isValidCNPJ("KG.KHZ.7LN/0001-98"); // true
isValidCEP("01001-000"); // true

//Uso com `format`

formatCPF("12345678901"); // "123.456.789-01"
formatCPF("1234"); // "123.4"

formatCNPJ("12345678000195"); // "12.345.678/0001-95"
formatCNPJ("123"); // "12.3"

formatCEP("01001000"); // "01001-000"
formatCEP("123"); // "123"
```

### Telefone

```ts
maskPhone("11987654321"); // "(11) 98765-4321"
maskPhone("1133224455"); // "(11) 3322-4455"
maskPhone("119"); // "(11) 9"
```

### Tipos

```ts
import type { MaskOptions } from "brazil-formatter";
```

## Licença

MIT
