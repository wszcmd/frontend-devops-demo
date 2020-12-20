// 部署配置
const path = require("path");
module.exports = {
  local: path.resolve(__dirname, '../dist'),
  remote: "/mnt/fe-projects/fe-demo2/dist",
  clientConfig: {
    port: 22,
    host: "47.96.94.154",
    username: "root",
    password: "Mm123456"
  },
};