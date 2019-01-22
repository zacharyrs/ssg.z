module.exports = {
  presets: ['@babel/preset-env'],
  env: {
    production: {
      presets: [
        [
          'minify',
          {
            keepClassName: true,
            keepFnName: true,
          },
        ],
      ],
    },
  },
}
