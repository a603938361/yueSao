/*
    bind:callChange
*/
Component({
    behaviors: ['wx://form-field'],
    properties: {
        title: {
            type: String,
            value: null
        },
        type: {
            type: String,
            value: null,
        },
        maxlength: {
            type: String,
            value: null,
        },
        value: {
            type: String,
            value: null,
            observer: function (newVal, oldVal) {
                this.watchValue(newVal);
            }
        },
        placeholder: {
            type: String,
            value: null
        },
        erroMsg: {
            type: String,
            value: null
        }
    },
    data: {
        setValue: '',
        isFocus: false,
    },
    methods: {
        /*属性监听*/
        watchValue(res) {
            this.setData({
                setValue: res,
            });
        },
        /*执行事件*/
        regStrFn(str) {
            let reg = /([^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac])/g,
                indexArr = reg.exec(str);
            if (str.match(reg)) {
                str = str.replace(reg, '');
            }
            let obj = {
                val: str,
                index: indexArr
            }
            return obj
        },
        /*接口请求*/
        /*页面交互*/
        inputHandle(evt) {

            let val = evt.detail.value,
                pos = evt.detail.cursor;

            let obj = this.regStrFn(val)

            if (pos != -1 && obj.index) {
                //计算光标的位置
                pos = obj.index.index
            }
            this.setData({
                value: obj.val
            });
            this.triggerEvent('callChange', obj.val);
            return {
                value: obj.val,
                cursor: pos
            }
        },
        /*组件响应*/
        /*数据分析*/
    }
})