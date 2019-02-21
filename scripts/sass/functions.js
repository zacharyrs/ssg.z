const sassUtils = require('node-sass-utils')

const sassVars = require('./vars.js')

const convertStringToSassDimension = result => {
  // Only attempt to convert strings
  if (typeof result !== 'string') {
    return result
  }

  const cssUnits = ['rem', 'em', 'vh', 'vw', 'vmin', 'vmax', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch']
  const parts = result.match(/[a-zA-Z]+|\d+/g)
  const value = parts[0]
  const unit = parts[parts.length - 1]

  if (cssUnits.indexOf(unit) !== -1) {
    result = new sassUtils.SassDimension(parseInt(value, 10), unit)
  }

  return result
}

const functions = {
  'get($keys)': keys => {
    keys = keys.getValue().split('.')
    let result = sassVars()
    let i
    for (i = 0; i < keys.length; i++) {
      result = result[keys[i]]
      if (typeof result === 'string') {
        result = convertStringToSassDimension(result)
      } else if (typeof result === 'object') {
        Object.keys(result).forEach(key => {
          const value = result[key]
          result[key] = convertStringToSassDimension(value)
        })
      }
    }

    result = sassUtils.castToSass(result)
    return result
  },
}

module.exports = functions
