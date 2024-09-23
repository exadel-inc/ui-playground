const editorconfig = require('eslint-plugin-editorconfig');

module.exports = [
  {
    plugins: {
      editorconfig
    },
    rules: {
      // Enforce charset check
      'editorconfig/charset': "warn",
      // Enforce EOL for all files
      'editorconfig/eol-last': "warn",
      // Require no trailing spaces
      'editorconfig/no-trailing-spaces': "warn"
    }
  }
];
