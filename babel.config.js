module.exports = {
  presets: [
    '@babel/preset-env'
  ],
  plugins: [
    [
      'babel-plugin-styled-components',
      {
        fileName: false
      }
    ],
    ['@babel/plugin-proposal-class-properties', { 'loose': false }],
    '@babel/plugin-proposal-export-default-from'
  ]
}
