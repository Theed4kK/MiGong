# 微信小游戏数据库API


* [数据库API文档](https://developers.weixin.qq.com/minigame/dev/wxcloud/reference-client-api/database/)

目前小游戏数据库API仅支持在微信小游戏环境内使用。

您可以直接使用微信的数据库API，如 `wx.cloud.init()`，但是在 Html5 环境下会报错。

您也可以使用我们封装的 API，如`egret.wxCloud.cloud.init`。白鹭封装的 API，在 Html5 环境下不会报错，会在 log 中提示 `该接口只在微信小游戏下可用`