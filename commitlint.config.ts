import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
	extends: ["@commitlint/config-conventional"],

	// Regras principais traduzidas do seu JSON
	rules: {
		// Tipos permitidos
		"type-enum": [
			2,
			"always",
			[
				"feat",
				"build",
				"deps",
				"docs",
				"fix",
				"style",
				"refactor",
				"test",
				"perf",
				"ci",
				"chore",
			],
		],

		// Comprimento do título
		"header-min-length": [2, "always", 10],
		"header-max-length": [2, "always", 120],

		// Escopo: se usar parênteses, não pode estar vazio
		"scope-empty": [0, "always"],

		// Escopos válidos (você pode expandir essa lista conforme necessário)
		"scope-enum": [1, "always", ["CHANGELOG", "DOCS"]],

		// Assunto (descrição) não pode começar com letra maiúscula
		"subject-case": [
			2,
			"never",
			["sentence-case", "start-case", "pascal-case", "upper-case"],
		],

		"subject-empty": [2, "never"],
		"subject-full-stop": [2, "never", "."],
	},

	// Meta-informações e mensagens auxiliares (não são regras, apenas documentação)
	helpUrl: "https://commitlint.js.org/#/reference-rules",
	prompt: {
		messages: {
			type: "Selecione o tipo de mudança que você está realizando:",
			scope: "Informe o escopo (opcional):",
			subject: "Digite uma descrição curta e direta da mudança:",
			body: "Descreva a motivação e o contexto (opcional):",
			footer: "Referência a issues (opcional):",
		},
		questions: {
			type: {
				description: "Define a natureza da mudança (feat, fix, chore, etc.)",
			},
			subject: {
				description: "Resumo em uma linha, minúsculo e sem ponto final",
			},
		},
	},
};

export default Configuration;
