//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '我是个Demo',
    shareBtnInfo:{
      text: '关闭分享',
      flag: true,
      type: 'warn'
    },
    templateInfo:{
      code:''
    },
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    /**
     * 网络请求
     */
    wx.request({
      url: 'http://60.255.160.15:8070/template/getDetailById', //仅为示例，并非真实的接口地址
      method:'GET',
      data: {
        id: '1'
      },
      success: res => {
        console.log(res.data)
        if(!res.data){
          this.setData({
            templateInfo: { code: '获取到code发生错误' }
          })
        }
        const code = res.data.code ;
        if (code == 20000){
          const data = res.data.data ;
          if(data){
            this.setData({
              templateInfo: {code:data.code}
            })
          }
        }else{
          this.setData({
            templateInfo: { code: '未获取到code' }
          })
        }
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 关闭/打开分享按钮点击事件
   */
  onShareCloseBtnClick : function(){
    if (this.data.shareBtnInfo.flag){
      wx.hideShareMenu()
      this.setData({ shareBtnInfo:{
        text: '打开分享',
        flag : false,
        type:'primary'
      }})
    }else{
      wx.showShareMenu({
        withShareTicket: true
      })
      this.setData({
        shareBtnInfo: {
          text: '关闭分享',
          flag: true,
          type: 'warn'
        }
      })
    }
  },
  /**
   * 分享事件处理
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  jumppage:function(){
    wx.navigateTo({
      url: '/pages/index/demo1',
    })
  },
  goBaidu: function () {
    wx.navigateTo({
      url: '/pages/index/baidu',
    })
  }
})