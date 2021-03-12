require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Express/React/Redux',
    description: 'Display data from an api.',
    head: {
      titleTemplate: 'React Redux Example: %s',
      meta: [
        {name: 'description', content: 'Display data from an api.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Express/React/Redux'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Express/React/Redux'},
        {property: 'og:description', content: 'Display data from an api.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@abc'},
        {property: 'og:creator', content: '@abc'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
