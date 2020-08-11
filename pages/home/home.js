// pages/home/home.js

const App = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.uploadFile({
      filePath: 'filePath',
      name: 'name',
      url: 'url',
    })

    wx.getSetting({
      withSubscriptions: true,
      success (res) { 
        console.log(res)
      },
      fail(err) {
        console.log(err)
      }
    })



    // wx.getUserInfo({
    //   complete: (res) => {},
    // })

    // App.request({
    //   url: 'https://xiaojiejie.oss-cn-shanghai.aliyuncs.com/minipro/Aerin/json/home.json',
    //   isDev: true,
    //   method: "GET"
    // }, {
    //   success: (res) => {
    //     this.setData({
    //       swiperData: res.swiper,
    //       brandsData: res.brands
    //     })
    //   }
    // });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getPhoneNumber (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },

  wxSubscribe(){
    wx.requestSubscribeMessage({
      tmplIds: ['GydwVtvd9EsO7p3bEw3CToBt9fGe3XnBGu0P4nXAWyU'],
      success (res) { 
        console.log(res)
      },
      fail(err) {
        console.log(err)
      }
    })
  },

  uploadIcon(){
    wx.chooseImage({
      count: 1,
      success(res){
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
      }
    })
  }
})