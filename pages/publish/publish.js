// pages/publish/publish.js
import Config from '../../config';

var App = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        enableSubmit: true,
        xueliArr: ["初中", "高中", "专科", "本科", "研究生"],
        xingbieArr: ['男', '女'],
        xingbieValue: '女',
        xueliValue: null,
        birValue: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    // 学历
    changeHandle(e) {
        console.log(e)

        let arr = this.data.xueliArr;
        let idx = e.detail.value

        this.setData({
            xueliValue: arr[idx]
        })
    },

    // 性别
    changeHandleSex(e) {
        let arr = this.data.xingbieArr;
        let idx = e.detail.value

        this.setData({
            xingbieValue: arr[idx]
        })
    },

    // 出生年月
    changeHandleBir(e) {
        let value = e.detail.value
        this.setData({
            birValue: value
        })
    },

    formSubmit(evt) {

        console.log(evt)

        let value = evt.detail.value;

        // if(!value.name){
        //     this.showToast('请输入姓名')
        //     return
        // }else if(!value.nation){
        //     this.showToast('请输入民族')
        //     return
        // }else if(value.birthday == null){
        //     this.showToast('请选择出生年月')
        //     return
        // }else if(!value.tel){
        //     this.showToast('请输入手机号码')
        //     return
        // }else if(!value.idCard){
        //     this.showToast('请输入身份证号码')
        //     return
        // }else if(!value.jiGuan){
        //     this.showToast('请输入籍贯')
        //     return
        // }else if(value.xueli == null){
        //     this.showToast('请选择学历')
        //     return
        // }

        this.submit(value)

    },

    submit(values) {
        App.request({
            key: 'basicInfo',
            data: values,
            loading: true
        }, {
            success: (res) => {

            },
            complete: () => {
                App.href({
                    key: 'myTag',
                });
            }
        })
    },


    uploadIcon() {
        // wx.chooseImage({
        //     count: 1,
        //     success(res) {
        //         const tempFilePaths = res.tempFilePaths
        //         console.log(tempFilePaths)
        //         wx.uploadFile({
        //             filePath: tempFilePaths,
        //             name: 'file',
        //             url: 'http://172.25.60.140/household/company/api/pic',
        //         })
        //     }
        // })

        wx.chooseImage({
            count:1,
            success(res) {
                const tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    url:Config.prod.root,
                    filePath: tempFilePaths[0],
                    name: 'file',
                    header:{
                        'content-type':'multipart/form-data',
                        'db':Config.prod.db,
                        'module':Config.prod.module,
                        'token':Config.prod.token
                    },
                    timeout:4000,
                    success(res) {
                        console.log('success --- ', res)
                        const data = res.data
                        console.log('success data --- ', data)
                    },
                    fail(err){
                        console.log('err --- ', err)
                    }
                })
            }
        })
    },

    showToast(msg) {
        wx.showModal({
            title: '提示',
            content: msg,
            showCancel: false
        });
    }


})