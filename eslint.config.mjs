import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
  // 1. Базовые рекомендуемые правила ESLint
  js.configs.recommended,

  // 2. Рекомендуемая настройка Prettier (включает плагин и отключает конфликты)
  eslintPluginPrettierRecommended,

  // 3. Дополнительное отключение конфликтующих правил (на всякий случай)
  eslintConfigPrettier,

  {
    // Настройки проекта (аналог "env")
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Если работаете в Node.js, добавьте это:
        ...globals.node,
      },
    },
    rules: {
      // Здесь можно переопределить правила
      'prettier/prettier': 'off',
    },
  },
];
