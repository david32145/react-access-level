module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@config': './src/config',
        '@controllers': './src/controllers',
        '@models': './src/models',
        '@services': './src/services'
      }
    }]
  ],
  ignore: [
    './src/@types',
    './src/__test__'
  ]
}
