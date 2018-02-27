'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://video.duc.cn/api"',
  imgReadUrl: '"http://images.duc.cn"'

})
