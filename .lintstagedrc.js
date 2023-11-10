module.exports = {
  '*': ['prettier --write --ignore-unknown'],
  '**/*.{js,ts,astro}': ['eslint --fix'],
};
