import js from "@eslint/js";
import globals from "globals";
import tseslint from 'typescript-eslint';
import {defineConfig} from "eslint/config";

export default defineConfig([
	// base config
	{
		files: ['**/*.{js,ts}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended
		],
		languageOptions: {
			globals: {
				...globals.node,
			}
		},
		rules: {
			"@typescript-eslint/no-unused-vars": ["error", {
				"varsIgnorePattern": "^_",
				"argsIgnorePattern": "^_",
				"caughtErrorsIgnorePattern": "^_",
			}]
		}
	},

	// tests
	{
		basePath: "src/test",
		languageOptions: {
			globals: {
				...globals.mocha,
			}
		},
	},
]);
