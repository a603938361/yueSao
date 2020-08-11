//保留当前跳转新开页面
/*
    App.href({
        key:'index',
        data:{
            test:'0'
        }
    });
*/

//关闭当前跳转新开页面
/*
    App.href({
		key:'index',
		data:{
			test:'0'
		},
		type:'redirectTo'
	});
*/

//关闭所有跳转新开页面
/*
    App.href({
		key:'index',
		data:{
			test:'0'
		},
		type:'reLaunch'
	});
*/

//返回N层页面（不触发onload）
/*
    App.href({
		type:'navigateBack',
		data:{delta:1}
	});
*/

/**
 * 当前栈中有指定页则返回指定页（不触发onload）
 * 使用App.store.getPageOptions()获取传递参数
 * 没有指定页则跳转新开页面
 */
/*
    App.href({
		key:'index',
		data:{
			test:'testStr'
		},
		type:'navigateBackTo',
    });
*/

import Api from 'render.api.js'
import Store from 'render.store.js'
/**
 * @param {key} String, 必填, description: 需要跳转的目的地||当type=='navigateBack'时此参数可不填
 * @param {data} Object, 可选, description: 携带的参数||当type=='navigateBack'时，为返回的页面数，默认{delta:1}
 * @param {type} String, 可选, description: 跳转方式
 */
function Href(option) {
	//初始化
	let _option = {
		key: option.key,
		data: option.data || null,
		type: option.type || 'navigateTo'
	}
	//返回
	if (_option.type == 'navigateBack') {
		if(!_option.data)_option.data={delta:1};
		Api('navigateBack',_option.data);
		return;
	}
	//返回目标
	if (_option.type == 'navigateBackTo') {
		let _tarPageIndex=getTarPageIndex(_option);
		let _pages = getCurrentPages();
		if(_tarPageIndex>=0){
            //设置目标参数
	        Store.setPageOptions(option.key, option.data);
			//返回目标页面
			let _maxIndex=_pages.length-1;
			Api('navigateBack',{
				delta:_maxIndex-_tarPageIndex
			});
			return;
		}
		//未在页面栈中发现对应页面，走navigateTo流程
		_option.type='navigateTo';
	}
	//打开新目标
    let _url = getUrl(_option);
	Api([_option.type],{ url: _url});
}
function getUrl(option){
    let _url = '/pages/' + option.key + '/' + option.key;
    if(option.data){
		_url+='?';
        for(let key in option.data){
			_url+=key+'='+option.data[key]+'&'
        }
	}

    return _url;
}
function getTarPageIndex(option){
	let _pages = getCurrentPages();
	let _index=-1;
	_pages.map((v,i)=>{
		if(v.route.split('/')[2]==option.key)_index=i;
	});
	return _index;
}
export default Href;