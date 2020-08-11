import Config from '../config.js';
import Api from 'render.api.js';
import Store from 'render.store.js';
import Util from 'util.js';
import MD5 from '../assets/lib/md5';
/*
	let _data = {}
	App.request({ key: 'test', data: _data}, {
		success: (res) => { },
		fail: (res) => { },
		complete:()=>{ }
	});
*/
function Request(params, option) {

    let _params = {
            key: params.key || 'noKey',
            method: params.method || 'POST', //请求的类型,默认POST， 如果是GET方式，需要参数设置
            data: params.data || null, //提交参数
            dataType: params.dataType || 'json', //返回的数据格式
            responseType: params.responseType || 'text', //设置响应的数据类型。合法值：text、arraybuffer
            loading: params.hasOwnProperty('loading') ? params.loading : true,
            isProd: params.isProd || false, //本地开发环境下使用生产模式请求
            supplier: params.supplier || 'connext', //开发来源识别
            isEncrypt: params.isEncrypt || false,
        }
        //初始化参数
    _params.url = params.url || getApiUrl(_params);
    _params.header = params.header || getApiHeader(_params);

    //显示loading
    if (_params.loading) { Api('showLoading', { title: "加载中", mask: true }) };
    //加密数据
    if (_params.isEncrypt) {
        params.data.sign = getApiData(params.data);
    }
    //储存
    console.log('@request-params:', 'key=', _params.key, _params);
    //本地数据处理
    if (Config.isDev && !_params.isProd) {
        let _fileRes = require(_params.url);
        setTimeout(() => {
            requestSuccessResult(_fileRes, _params, option);
        }, 500);
        return;
    }
    //正式请求
    requestStart(_params).then((res) => {
        console.log('res: ', res);
        if (res.statusCode == 200) {
            requestSuccessResult(res.data, _params, option);
        } else {
            Api('showToast', {
                title: res.errMsg,
                icon: 'none',
                mask: true,
            });

            requestEnd(res.data, _params, option);
        }
    });
};

function requestStart(params) {
    // console.log('params: ', params);

    wx.request({
      url: 'url',
    })

    return new Promise((resolve, reject) => {
        Api('request', {
            url: params.url,
            data: params.data,
            header: params.header,
            method: params.method,
            dataType: params.dataType,
            responseType: params.responseType,
            complete: (res) => {
                resolve(res);
            }
        })
    });
};

function requestSuccessResult(resData, params, option) {
    //请求完成
    requestEnd(resData, params, option);
    //默认拦截
    if (params.supplier == 'connext') {
        switch (resData.code) {
            case 1:
            case '1':
                console.log('@request-success:', 'key=', params.key, resData);
                if (option.success) option.success(resData, params, 'success');
                break;
            default:
                console.log('@request-fail:', 'key=', params.key, resData);
                if (option.fail) {
                    option.fail(resData);
                } else {
                    if (resData.errmsg == 'cookie_timeout') {
                        // console.log("进入重新登录流程")
                        wx.login({
                            success: function(res) {
                                var code = res.code;
                                // console.log("WXCODE====", code)
                                if (code) {
                                    let _data = {
                                        code: code
                                    }
                                    Request({
                                        key: 'authSignin',
                                        data: _data,
                                        method: "POST",
                                        isEncrypt: true
                                    }, {
                                        success: (res) => {
                                            if (res.code == 1) {

                                                var user = new Object();
                                                user.openId = res.data.openid;
                                                user.cookie = res.data.cookies
                                                user.phone = res.data.phone

                                                Store.setStorage({
                                                    key: 'userInfo',
                                                    value: user,
                                                    success: (res) => {
                                                        // console.log('存储userInfo SUCESS')
                                                    }
                                                });
                                            }
                                        }

                                    })
                                }
                            }
                        })
                    }

                    Api('showToast', {
                        title: resData.text,
                        icon: 'none',
                        mask: true,
                        duration: 4000
                    } );

                }
        }
    }
};

function requestEnd(resData, params, option) {
    //关闭loading
    if (params.loading) {
        Api('hideLoading');
    }
    //接口取得返回结果
    if (option.complete) option.complete(resData);
};

function getApiHeader(params) {
    let _obj = {
        'content-type': 'application/x-www-form-urlencoded',
        'version': 'v2.0',
        'access-token': '3ccfB8ab8NKjP8XZqDNqg2Xq8GYSwUd9'
    };
    return _obj;
};

function getApiUrl(params) {
    let _url;
    if (Config.isDev && !params.isProd) {
        let _filePath = params.key + '.js';
        if (Config.dev.api[params.key]) _filePath = Config.dev.api[params.key];
        _url = Config.dev.root + _filePath;
    } else {
        let _filePath = params.key;
        if (Config.prod.api[params.key]) _filePath = Config.prod.api[params.key];
        _url = Config.prod.root + _filePath;
    }
    return _url;
};

function getApiData(data) {
    let _data = Util.ksort(data);
    _data = JSON.stringify(_data);
    let _secret = 'connext123123';
    _data = (_data + _secret).toUpperCase();
    // console.log(_data)
    _data = MD5(_data).toUpperCase();

    return _data;
    // return 'connext2019';
}

export default Request;