const { NodeSSH } = require("node-ssh");
const ora = require("ora");
const { dots } = require("cli-spinners");
const toast = ora(dots);

module.exports = async function (option) {
    try {
      //获取命令行选项 cp 是否移动
      const { cp } = option;
      //获取部署相关配置
      const { local, remote, clientConfig} = require('../config')
      console.log(cp)
      //连接服务器
      toast.info("开始连接远程主机!");
      toast.start('连接中...');
      const client = new NodeSSH();
      await client.connect(clientConfig);
      toast.succeed("连接成功!");
      
      //是否 删除 远程服务器上目录
      if(cp){//备份
        toast.info("开始备份远程主机文件!");
        toast.start('备份中...');
        //202012181611718
        const time = new Date().toLocaleString("chinese", { hour12: false }).split(/:|\/|\s/g).map(v=>v.padStart(2,"0")).join("")
        await client.exec("cp", ["-r", remote,remote+time]);
        toast.succeed('备份成功');
      }else {//删除
        toast.info("开始删除远程主机文件!");
        toast.start('删除中...');
        await client.exec("rm", ["-rf", remote]);
        toast.succeed('删除成功');
      }

      //本地文件 部署 到服务器目标路径 
      toast.info("开始部署文件!");
      toast.start('部署中...');
      const status = await client.putDirectory(local, remote, {recursive: true,concurrency: 10 });
      status? toast.succeed('部署成功'):toast.fail('部署失败');

      process.exit(0);
    } catch (error) {
      console.log(error)
    }
  };