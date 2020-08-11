const App = getApp();
/*
    import CheckAuth from '../../utils/check-auth';
    
    CheckAuth.start({
        scope:'scope.address',
        title:'点击确定前往设置',
        msg:'我们需要您的地址权限以继续操作',
        success:()=>{
            console.log('success');
        },
        fail:()=>{
            console.log('fail');
        }
    })
*/
/**
 * @param {option.scope} String, 必填, description: 需要验证的权限名
 * @param {option.title} Object, 可选, description: 跳转打开权限页面的标题
 * @param {option.msg} String, 可选, description: 跳转打开权限页面的文本
 * @param {option.success} Object, 可选, description: 取得权限成功（权限的请求需自行在callback中执行）
 * @param {option.fail} String, 可选, description: 取得权限失败
 */
function start(option) {
	App.api('getSetting',{
		complete: (res) => {
			if (!res.authSetting[option.scope]) {
				App.api('authorize',{
					scope: option.scope,
					success: () => {
						if (option.success) option.success();
					},
					fail: () => {
						App.api('showModal',{
							title: option.title,
							content: option.msg,
							success: (smRes) => {
								if (smRes.confirm) {
									App.api('openSetting',{
										success: (res) => {
											if (res.authSetting[option.scope]) {
												if (option.success) option.success();
											} else {
												if (option.fail) option.fail();
											}
										}
									})
								} else {
									if (option.fail) option.fail();
								}
							}
						})
					}
				})

			} else {
				if (option.success) option.success();
			}
		}
	})
}
const CheckAuth = {
	start: start
}
export default CheckAuth;