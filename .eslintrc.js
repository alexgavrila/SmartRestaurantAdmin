module.exports = {
  root: true,

  env: {
    node: true,
  },

  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
  },

  parser: "vue-eslint-parser",

  parserOptions: {
    parser: "babel-eslint",
  },

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },

  extends: [
    "plugin:vue/vue3-recommended",
    // "@vue/standard",
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/prettier",
  ],
};
