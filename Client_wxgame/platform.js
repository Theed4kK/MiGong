/**
 * 请在白鹭引擎的Main.ts中调用 platform.login() 方法调用至此处。
 */

class WxgamePlatform {

  name = 'wxgame'

  login() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          resolve(res)
        }
      })
    })
  }

  getUserInfo(width, height) {
    const showErrModal = this.showErrModal;
    return new Promise((resolve, reject) => {
      let sysInfo = wx.getSystemInfoSync();
      let sdkVersion = sysInfo.SDKVersion;
      sdkVersion = sdkVersion.replace(/\./g, "");
      sdkVersion = sdkVersion.substr(0, 3);
      let sdkVersionNum = parseInt(sdkVersion);
      // 判断是否已经授权 - 并且兼容 2.0.1 以前版本获取
      wx.getSetting({
        success(res) {
          if (sdkVersionNum >= 201 && !res.authSetting['scope.userInfo']) {
            // 创建获取用户信息按钮
            var button = wx.createUserInfoButton({
              type: 'text',
              text: '',
              style: {
                left: 0,
                top: 0,
                width: width,
                height: height,
                lineHeight: 0,
                textAlign: 'center',
                backgroundcolor: '',
                color: '#ffffff',
                fontSize: 16,
                borderRadius: 4
              }
            });
            button.onTap((res) => {
              if (res.userInfo) {
                var userInfo = res.userInfo;
                button.destroy();
                resolve(userInfo);
              } else {
                showErrModal();
              }
            });
          } else {
            // 已授权 - 直接获取
            wx.getUserInfo({
              withCredentials: true,
              success: res => {
                var userInfo = res.userInfo;
                resolve(userInfo);
              },
              fail: res => {
                showErrModal();
              }
            });
          }
        }
      });
    })
  }

  showErrModal() {
    wx.showModal({
      title: '友情提醒',
      content: '请允许微信获得授权!',
      showCancel: false,
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3cc51f'
    });
  }

  openDataContext = new WxgameOpenDataContext();
}

class WxgameOpenDataContext {

  createDisplayObject(type, width, height) {
    const bitmapdata = new egret.BitmapData(sharedCanvas);
    bitmapdata.$deleteSource = false;
    const texture = new egret.Texture();
    texture._setBitmapData(bitmapdata);
    const bitmap = new egret.Bitmap(texture);
    bitmap.width = width;
    bitmap.height = height;

    if (egret.Capabilities.renderMode == "webgl") {
      const renderContext = egret.wxgame.WebGLRenderContext.getInstance();
      const context = renderContext.context;
      ////需要用到最新的微信版本
      ////调用其接口WebGLRenderingContext.wxBindCanvasTexture(number texture, Canvas canvas)
      ////如果没有该接口，会进行如下处理，保证画面渲染正确，但会占用内存。
      if (!context.wxBindCanvasTexture) {
        egret.startTick((timeStarmp) => {
          egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
          bitmapdata.webGLTexture = null;
          return false;
        }, this);
      }
    }
    return bitmap;
  }


  postMessage(data) {
    const openDataContext = wx.getOpenDataContext();
    openDataContext.postMessage(data);
  }
}


window.platform = new WxgamePlatform();