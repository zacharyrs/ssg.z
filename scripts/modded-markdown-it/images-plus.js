const path = require('path')

const imagesPlus = md => {
  md.renderer.rules.image = (tokens, idx, options, env) => {
    const token = tokens[idx]

    const href = path.join(env.dir, token.attrs[token.attrIndex('src')][1]) // TODO: check for non local images or youtube links
    const text = token.content
    let title = ''

    if (token.attrIndex('title') !== -1) {
      title = 'title="' + token.attrs[token.attrIndex('title')][1] + '"'
    }

    return `
    <span class="image-wrapper">
    <img class="image-preview" src="\${require('${href}').preview}" alt="${text}" ${title}>
    <img class="image-main" onload="this.classList.add('image-loaded')" src="\${require('${href}').src}" srcset="\${require('${href}').srcSet}" alt="${text}" ${title}>
    </span>
    `
  }
}

module.exports = imagesPlus
