import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  { ignores: [".next/**", "node_modules/**", ".agents/**", ".claude/**", "skills/**", ".playwright/**", ".playwright-cli/**", "next-env.d.ts"] },
];

export default config;
