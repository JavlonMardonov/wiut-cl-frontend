module.exports = {
  extends: [
    "airbnb",
    "airbnb-typescript",
    "plugin:import/typescript",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-use-before-define": ["error", {
        "functions": false,
        "classes": true,
        "variables": true,
        "allowNamedExports": true,
    }],
    "no-use-before-define": ["error", {
        "functions": false,
        "classes": true,
        "variables": true,
        "allowNamedExports": true
    }],
    "jsx-a11y/label-has-associated-control": [ 2, {
      "labelAttributes": ["label"],
      "controlComponents": ["RadioGroupItem"],
      "depth": 3,
    }],
    "jsx-a11y/label-has-for": [2, {
        "required": {
            "every": [ "id" ]
        },
      },
    ],
    "react/no-unstable-nested-components": [
      1,
      {
        allowAsProps: true,
      },
    ],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: ["function-declaration", "arrow-function"],
        unnamedComponents: "arrow-function",
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "": "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "import/order": [
      "error",
      {
        // Order the groups of imports
        groups: [
          "builtin", // Node.js built-in modules (e.g., 'fs', 'path')
          "external", // Packages from npm (e.g., 'react')
          "internal", // Absolute imports (e.g., '@/components/SomeComponent')
          "parent", // Relative imports from parent directories (e.g., '../../')
          "sibling", // Relative imports from sibling directories (e.g., '../')
          "index", // Import from index files (e.g., './')
        ],
        // Define the order within groups
        "newlines-between": "always", // New line between each group
        pathGroups: [
          {
            pattern: "@/modules/**", // Match your absolute imports
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/**", // Match your absolute imports
            group: "internal",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: {
          order: "asc", // Alphabetical order within groups
          caseInsensitive: true, // Case insensitive sorting
        },
      },
    ],
  },
  plugins: ["react", "@typescript-eslint", "prettier", "import"],
};
