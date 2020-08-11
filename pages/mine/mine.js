// pages/mine.js

var App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    App.store.getStorage({key:"userInfo", success:function(res){
      that.setData({
        userInfo:res
      })
    }})
  },

  getuserinfo: function(){

    wx.getUserInfo({
      success: (result) => {
        this.setData({
          userInfo: result.userInfo
        })
        App.store.setStorage({key:"userInfo", value:result.userInfo})
      },
      complete: (res) => {},
    })
  }
})