/**
 * @type import('@vue/cli-service').ProjectOptions
 */
const config ={
  outputDir:'docs',
  publicPath:process.env.NODE_ENV==='production'?'/frontend-devops-demo':'/'
  // publicPath:process.env.NODE_ENV==='production'?'/':'/'
}
module.exports = config