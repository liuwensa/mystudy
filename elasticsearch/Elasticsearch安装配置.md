# Elasticsearch笔记(一)—Elasticsearch安装配置

## 一、安装Elasticsearch
安装Elasticsearch需要安装新版的java（安装java配置java自行百度）。

Elasticsearch下载地址：http://www.elasticsearch.org/download/ 。

window下载后直接解压，进入目录下的bin，在cmd下运行elasticsearch.bat 即可启动Elasticsearch，用浏览器访问： http://localhost:9200/  

## 二、插件介绍及安装

### Head

Head是一个用来监控Elasticsearch状态的客户端插件。

安装：到bin目录下 plugin install mobz/elasticsearch-head

安装后再浏览器中输入： http://localhost:9200/_plugin/head/。