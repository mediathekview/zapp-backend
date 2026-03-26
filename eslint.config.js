import js from "@eslint/js";
import globals from "globals";
import {defineConfig} from "eslint/config";

export default defineConfig([
	// base config
	{
		plugins: {
			js
		},
		extends: [
			"js/recommended"
		],
		languageOptions: {
			globals: {
				...globals.node,
			}
		},
		rules: {
			"no-unused-vars": ["error", {
				"varsIgnorePattern": "^_",
				"argsIgnorePattern": "^_",
				"caughtErrorsIgnorePattern": "^_",
			}]
		}
	},

	// tests
	{
		basePath: "test",
		languageOptions: {
			globals: {
				...globals.mocha,
			}
		},
	},
]);
