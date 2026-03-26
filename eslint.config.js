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
