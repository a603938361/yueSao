/*
    bind:callChange
*/
Component({
    behaviors: ['wx://form-field'],
    properties: {
        title:{
            type: String,
            value: null
        },
        name: {
            type: String,
            value:null,
        },
        value: {
            type: Array,
            value: [],
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
        changeHandle(evt){
            this.setData({
                value:evt.detail.value,
            });
            this.triggerEvent('callChange', evt.detail.value);
        },
        /*回馈父级*/
		/*组件响应*/
        /*数据分析*/
    }
})