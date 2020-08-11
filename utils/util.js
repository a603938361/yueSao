/*
	import Util from '../../utils/util.js';
*/
function formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function getUrlDataByObject(obj) {
    let _key;
    let _str = '?';
    for (_key in obj) {
        _str += _key + '=' + obj[_key] + '&';
    }
    let _lastIndex = _str.lastIndexOf('&');
    _str = _str.substring(0, _lastIndex);
    return _str;
}

function getArrIndexByValue(arr, value) {
    let _index = -1;
    for (let i in arr) {
        if (arr[i] == value) _index = i;
    }
    return _index;
}

function turnArrObjToArrByKey(arr, key) {
    let _arr = []
    for (let i in arr) {
        _arr.push(arr[i][key]);
    }
    return _arr;
}

function turnArrObjToObjByKey(arr, key) {
    let _obj = {};
    for (let i in arr) {
        let _key = arr[i][key]
        _obj[_key] = arr[i];
    }
    return _obj;
}

function ksort(inputArr, sort_flags) {
    var tmp_arr = {},
        keys = [],
        sorter, i, k, that = this,
        strictForIn = false,
        populateArr = {};

    switch (sort_flags) {
        case 'SORT_STRING':
            // compare items as strings
            sorter = function (a, b) {
                return that.strnatcmp(a, b);
            };
            break;
        case 'SORT_LOCALE_STRING':
            // compare items as strings, original by the current locale (set with  i18n_loc_set_default() as of PHP6)
            var loc = this.i18n_loc_get_default();
            sorter = this.php_js.i18nLocales[loc].sorting;
            break;
        case 'SORT_NUMERIC':
            // compare items numerically
            sorter = function (a, b) {
                return ((a + 0) - (b + 0));
            };
            break;
            // case 'SORT_REGULAR': // compare items normally (don't change types)
        default:
            sorter = function (a, b) {
                var aFloat = parseFloat(a),
                    bFloat = parseFloat(b),
                    aNumeric = aFloat + '' === a,
                    bNumeric = bFloat + '' === b;
                if (aNumeric && bNumeric) {
                    return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
                } else if (aNumeric && !bNumeric) {
                    return 1;
                } else if (!aNumeric && bNumeric) {
                    return -1;
                }
                return a > b ? 1 : a < b ? -1 : 0;
            };
            break;
    }

    // Make a list of key names
    for (k in inputArr) {
        if (inputArr.hasOwnProperty(k)) {
            keys.push(k);
        }
    }
    keys.sort(sorter);

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js
        .ini['phpjs.strictForIn'].local_value !== 'off';
    populateArr = strictForIn ? inputArr : populateArr;

    // Rebuild array with sorted key names
    for (i = 0; i < keys.length; i++) {
        k = keys[i];
        tmp_arr[k] = inputArr[k];
        if (strictForIn) {
            delete inputArr[k];
        }
    }
    for (i in tmp_arr) {
        if (tmp_arr.hasOwnProperty(i)) {
            populateArr[i] = tmp_arr[i];
        }
    }

    return strictForIn || populateArr;
}
/** 
 * iPhone X 以后机型
 * */
function isiPhoneXLater(callback) {
    wx.getSystemInfo({
        success: function (res) {
            const statusBarHeight = res.statusBarHeight
            if (statusBarHeight === 44) {
                callback(true)
            } else {
                callback(false)
            }
        }
    })
}
/** 
 * iPhone X 以后机型
 * */
function versionCompare(ver1, ver2) { //版本比较
    var version1pre = parseFloat(ver1)
    var version2pre = parseFloat(ver2)
    var version1next = parseInt(ver1.replace(version1pre + ".", ""))
    var version2next = parseInt(ver2.replace(version2pre + ".", ""))
    if (version1pre > version2pre)
        return true
    else if (version1pre < version2pre)
        return false
    else {
        if (version1next > version2next)
            return true
        else
            return false
    }
}

/** 替换emoji表情 */

function filterEmoji(name) {

    var str = name.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig, "");

    return str;

}

const Util = {
    ksort: ksort,
    formatTime: formatTime,
    formatNumber: formatNumber,
    getArrIndexByValue: getArrIndexByValue,
    getUrlDataByObject: getUrlDataByObject,
    turnArrObjToArrByKey: turnArrObjToArrByKey,
    turnArrObjToObjByKey: turnArrObjToObjByKey,
    isiPhoneXLater: isiPhoneXLater,
    versionCompare: versionCompare,
    filterEmoji :   filterEmoji
}
export default Util;