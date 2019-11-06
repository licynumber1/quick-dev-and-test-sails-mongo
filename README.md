# lee-sails

1、这是一个帮助前端开发人员，使用sails.js快速开发后台模块的库

2、使用后台主流的mvc的开发方式，有后台开发工作经验的童鞋可快速上手

3、采用waterline方式可随时替换其他数据库而无需更改大量代码，自动返回restful接口

4、支持传参进行链表查询，采用前后端约定式开发，通过数据渲染页面或逻辑。

5、 NEW! 加入爬虫爬取新闻的实践，可根据此快速开发不需要运维的全栈的网页、app、小程序。 by~ 2019.3.30


### Quick start

project depends on node.js,mongodb and git , make sure the computer is installed

Trans：依赖于node.js,mongodb,git等环境，请确保已经安装在开发机器上。



git clone git@github.com:licynumber1/quick-dev-and-test-sails-mongo.git

cd quick-dev-and-test-sails-mongo

npm install --registry=https://registry.npm.taobao.org

cd view/my-app

npm install --registry=https://registry.npm.taobao.org

==============================================mongodb环境========================================================

对于window环境，可以通过某度安装
对于mac环境，可以通过
# 进入 /usr/local
cd /usr/local

# 下载
sudo curl -O https://fastdl.mongodb.org/osx/mongodb-osx-ssl-x86_64-4.0.9.tgz

# 解压
sudo tar -zxvf mongodb-osx-ssl-x86_64-4.0.9.tgz

# 重命名为 mongodb 目录

sudo mv mongodb-osx-x86_64-4.0.9/ mongodb
方式来下载
对于linux服务器，可以安装自带mongodb镜像或同mac方法来安装

==============================================服务器部署========================================================

open mongod.exe and mongo.exe from the root directory of mongodb

位于 : /usr/local/mongodb/bin

Trans：打开位于根目录的mongodb的应用文件mongod.exe、mongo.exe

推荐使用screen来管理多个命令环境：

可能用到的命令：
  screen -ls 查看screen
  screen -S web/node 添加一个screen 并前往
  ./mongo 运行mongo

npm run start-node

npm run start-web

再输入任意键，当在命令行中出现一艘帆船，并将后台端口显示出来的时候就说明后台启动成功了。


tips：由于前端界面作为后台开发的辅助类工具，因而放在一个项目中

### Plan or fix

暂时只支持简单的增删改查，有待增加模糊匹配、翻页和排序方式

框架目前没有对事务进行统一处理，mysql可以添加代码采用自身所带的回滚机制，其他数据库需要开发者自己实现。

......

### Build

关于部署，现已将项目部署到http://149.129.111.193/上，根据需要对项目进行修改

避坑指南：
  0、配置ssh key：https://www.cnblogs.com/superGG1990/p/6844952.html
  1、阿里云网页远程桌面关闭后，立刻中断服务。 解决方法：命令前加screen
  2、mongodb需在usr/local/mongodb下创建 mongodserver/data/db文件夹
  3、后台所有命令都需要root权限


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Thu Dec 27 2018 13:30:38 GMT+0800 (中国标准时间) using Sails v1.1.0.

<!-- Internally, Sails used [`sails-generate@1.16.4`](https://github.com/balderdashy/sails-generate/tree/v1.16.4/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

"# quick-dev-and-test-sails-mongo" 
"# quick-dev-and-test-sails-mongo" 
"# quick-dev-and-test-sails-mongo" 
