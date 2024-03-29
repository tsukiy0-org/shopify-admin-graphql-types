module.exports = {
  extends: ["next", "turbo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "prettier/prettier": ["error"],
  },
};
