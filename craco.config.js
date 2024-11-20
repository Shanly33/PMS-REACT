const path = require('path')
const lessPlugin = require("craco-less");
module.exports = {
  plugins: [
    {
      plugin: lessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // antdv 主题之类的配置
            // modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
            modifyVars: {
              hack: `true; @import "${path.resolve(__dirname, 'src/assets/styles/variables.less')}";`,
            },
          }
        }
      }
    }
  ],
  // 如果没安装，可以删除
  babel: {
    plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]]
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // 可以根据需要添加更多别名
    },
  },
}