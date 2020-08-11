const App = getApp();
/*
	import CheckForm from '../../utils/check-form.js';
	
	let _result=CheckForm.start(_data);
	console.log(_result);
*/
import Config from '../config.js';
/**
 * @param {data} Object, 必填, description: form表单的提交结果data值
 */
function start(data) {
	var _resultArr = [];
	for (var _key in data) {
		var _resultObj = checkValue(_key, data[_key]);
		if (_resultObj) _resultArr.push(_resultObj);
	}
	return _resultArr;
}
/**
 * @param {key} String, 必填, description: Key值，对应使用config中事先预设的方法进行验证
 * @param {value} Any, 必填, description: value值
 */
function checkValue(key, value) {
	let _nameObj = Config.form.preset;
	let _key = key.split('_')[0];
	let _resultObj = {
		boo: true,
		value:value,
		key: key
	};
	if (_key in _nameObj) {
		for (var i = 0; i < _nameObj[_key].length; i++) {
			let _boo;
            let _item = _nameObj[_key][i];
            switch(_item.type){
                case 'checkbox':
                    _item.rule.map((cv) => {
                        _boo = value.includes(cv);
                    });
                    break;
                case 'picker':
                    _boo=value.length>_item.rule;
                    break;
                default:
                    _item.type='input';
                    if(_key=='requied'){
                        _boo=value.length>0;
                    }else{
                        let _reg = new RegExp(Config.form.rule[_item.rule]);
                        _boo = _reg.test(value);
                    }
            }
			if (!_boo) {
				_resultObj.boo = false;
				_resultObj.rule=_item.rule;
				_resultObj.msg = _item.erroMsg;
				break;
			};
		}
	} else {
		//console.log('ERRO:未设置=>' + _key + '的验证方式',value);
	}
	return _resultObj;
}
const CheckForm = {
	start: start
}
export default CheckForm;