/*
    App.store.set('token','0001');
    App.store.get('token');
    
	App.store.setStorage({
        key:'openid',
        value:'0001'
        success:(res)=>{
            
        }
    });
    App.store.getStorage({
        key:'openid',
        success:(res)=>{
            
        }
    });

    App.store.setPageOptions('login',{});
    App.store.getPageOptions();
    App.store.clearPageOptions();
*/

//储存页面入参
let _pageOptions={};
//储存临时数据
const _templateData = {
    userInfo:null,//用户登录信息
}
//储存storage数据
const _storageAllowKey = [
    "userInfo",
];
//判定是否打印
const _showSetSuccess=true;
const _showGetSuccess=true;
const _showFailConsole=true;

const Store = {
    /**
     * 储存临时数据
     * @param {key} String, 必填, description: 临时数据对应的key值，只能存放在_templateData中声明过的值
     * @param {value} Any, 必填, description: 需要存放的数据
     */
    set: (key, value) => {
        if (key in _templateData) {
            _templateData[key] = value;
            if(_showSetSuccess)console.log('SUCCESS:set key=' + key + ' in option:', _templateData[key]);
        } else {
            if(_showFailConsole)console.log('ERRO:key=>'+ key +' is uncreate in option');
        }
    },
    /**
     * 获取临时数据
     * @param {key} String, 必填, description: 获取临时数据对应的key值
     */
    get: (key) => {
        if (key in _templateData) {
            if(_showGetSuccess)console.log('SUCCESS:get key=' + key + ' in option:', _templateData[key]);
            return _templateData[key];
        } else {
            if(_showFailConsole)console.log('ERRO:key=>'+ key +' is uncreate in option');
        }
    },
    /**
     * 储存storage
     * @param {option.key} String, 必填, description: Storage数据对应的key值，只能存放在_storageAllowKey中声明过的值
     * @param {option.value} Any, 必填, description: 需要存放的数据
     * @param {option.success} Any, 必填, description: 保存数据成功时回调
     */
    setStorage: (option) => {
        if (_storageAllowKey.indexOf(option.key) >= 0) {
            wx.setStorage({
                key: option.key,
                data: option.value,
                success: (res)=>{
                    if(option.success)option.success(res.data);
                   
                    if(_showSetSuccess)console.log('SUCCESS:setStorage @key=' + option.key + '@ in weixin:', option.value);
                }
            });
        } else {
            if(_showFailConsole)console.log('ERRO:key=>'+ key +' is uncreate in option');
        }
    },
    /**
     * 获取storage
     * @param {option.key} String, 必填, description: 获取Storage数据对应的key值
     * @param {option.success} Any, 必填, description: 获取数据成功时回调
     */
    getStorage: (option) => {
        wx.getStorage({
            key: option.key,
            success: (res)=>{
                if(option.success)option.success(res.data);
                if(_showGetSuccess)console.log('SUCCESS:getStorage @key=' + option.key + '@ in weixin:', res.data);
            },
            fail: (res)=>{
                if (option.fail) option.fail(res);
                if(_showFailConsole)console.log('ERRO:did not find @' + option.key + '@ in weixin');
            }
        })
    },
    /**
     * 存储页面入参
     */
    setPageOptions:(key,value)=>{
        console.log(key,value,'----')
        _pageOptions[key]=value;
    },
    /**
     * 获取页面入参
     */
    getPageOptions:(option)=>{
        let _pages = getCurrentPages();
        let _key=_pages[_pages.length-1].route.split('/')[2];
        let _option=_pageOptions[_key];
        if(!_option)_option={};
        _option=Object.assign(_option,option);
        return _option;
    },
    /**
     * 清除页面入参
     */
    clearPageOptions:()=>{
        let _pages = getCurrentPages();
        let _key=_pages[_pages.length-1].route.split('/')[2];
        if(_pageOptions[_key])_pageOptions[_key]={};
    },
}
export default Store;