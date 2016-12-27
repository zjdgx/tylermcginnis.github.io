var rucksack = require('rucksack-css')
var lost = require("lost")
var cssnext = require("postcss-cssnext")

exports.modifyWebpackConfig = function(config, env) {
  config.merge({
    postcss: [
      lost(),
      rucksack(),
      cssnext({
        browsers: ['>1%', 'last 2 versions']
      })
    ]
  })

  config.loader('svg', {
    test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader',
  })

  return config
}

import fs from 'fs-extra-promise'
import sm from 'sitemap'

const sitename = 'https://tylermcginnis.com'

function generateSiteMap(pages) {

  const urls = pages.filter((page) => page.path !== undefined)
    .map((page) => {
      if (page.path === '/') {
        return {
          url: sitename + page.path,
          changefreq: 'weekly',
          priority: 1,
          lastmodISO: new Date().toISOString()
        }
      }

      return {
        url: sitename + page.path,
        changefreq: 'monthly',
        priority: 0.5,
        lastmodISO: page.data.date || new Date().toISOString()
      }
    })

  const sitemap = sm.createSitemap({
    hostname: 'https://tylermcginnis.com',
    cacheTime: '60000',
    urls
  })
  console.log('Generating sitemap.xml')
  fs.writeFileSync(
    `${__dirname}/public/sitemap.xml`,
    sitemap.toString()
  )
}

export function postBuild(pages, callback) {
  generateSiteMap(pages)
  callback()
}