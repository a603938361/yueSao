
// pages/myTag.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagArr:[{flag:false, title:'早产儿、病产儿护理'},
    {flag:false, title:'喂养技巧调理'},
    {flag:false, title:'吐奶、溢奶预防'},
    {flag:false, title:'协助实现母乳喂养'},
    {flag:false, title:'调理产妇体质'},
    {flag:false, title:'杜绝乳腺炎'},
    {flag:false, title:'催乳'},
          {flag:false, title:'调理月子餐'},
          {flag:false, title:'早教'},],
    enableSubmit:true,

    cert:[{flag:false, title:'高级母婴护理师证书'},
    {flag:false, title:'高级催乳师证书'},
    {flag:false, title:'营养师证书'},
    {flag:false, title:'育婴师'},
    {flag:false, title:'高级通乳师证书'},
    {flag:false, title:'高级育婴师证书'},],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  tagClick(e){
    let idx = e.currentTarget.dataset.idx;
    let data = this.data.tagArr
    let item = data[idx]
    item.flag = !item.flag
    this.setData({
      tagArr:data
    })
  },

  tagClickCert(e){
    let idx = e.currentTarget.dataset.idx;
    let data = this.data.cert
    let item = data[idx]
    item.flag = !item.flag
    this.setData({
      cert:data
    })
  }
})