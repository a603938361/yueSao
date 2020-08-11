/*
    apiName 方法名
    options 参数
*/
function Api(apiName, options = {}){
    let _options = {
        ...options
    };
    // 调用wx方法
    if(wx[apiName]){
        wx[apiName](_options);
    }else{
        console.log('ERRO:apiName=>'+ apiName +' is not wx function');
    }
    
}
export default Api;