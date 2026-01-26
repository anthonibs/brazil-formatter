/* eslint-env node */
/** @type {import('jest').Config} */
export default {
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["**/__tests__/**/*.test.ts"],
	clearMocks: true,
};
