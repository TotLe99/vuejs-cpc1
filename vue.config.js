const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
      ? 'https://github.com/TotLe99/login-cpc1-vuejs.git' // Thay tên repository của các bạn vào đây nhé
      : '/',
};