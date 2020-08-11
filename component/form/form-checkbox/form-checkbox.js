/*
    bind:callChange
*/
Component({
    behaviors: ['wx://form-field'],
    properties: {
        text:{
            type: String,
            value: null
        },
        name: {
            type: String,
            value:null,
        },
        value: {
            type: Boolean,
            value: false,
        },
        placeholder:{
            type: String,
            value: null
        },
        erroMsg:{
            type: String,
            value: null
        }
    },
    data: {},
    methods: {
        /*属性监听*/
        /*接口请求*/
        /*执行事件*/
        /*页面交互*/
        tapBox(){
            let _value=!this.data.value;
            this.setData({
                value:_value,
            });
            this.triggerEvent('callChange', _value);
        },
        /*回馈父级*/
		/*组件响应*/
        /*数据分析*/
    }
})