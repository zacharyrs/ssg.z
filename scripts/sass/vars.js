module.exports = () => {
  delete require.cache[require.resolve('../../src/base/components/sass-vars.js')]
  const main = require('../../src/base/components/sass-vars.js')

  delete require.cache[require.resolve('../../src/content/sass-vars.js')]
  const overrides = require('../../src/content/sass-vars.js')(main)

  const merged = { ...main, ...overrides }

  return merged
}
