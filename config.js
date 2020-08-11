const config = {
    //本地测试模式
    isDev: false,
    //接口开发路径
    dev: {
        root: "../assets/data/",
        api: {
            // home

            // pdt
            productGetDetail: 'productGetDetail.js', //产品详情
            productGetCateList: 'productGetCateList.js', //获取分类列表
            productGetList: 'productGetList.js', //产品列表

            // cart
            shoppingCartCheckCart: 'shoppingCartCheckCart.js', //	获取购物车产品数量
            productPaidSampleDetail: 'productPaidSampleDetail.js', // 获取付邮试用小样列表
            productSampleDetail: 'productSampleDetail.js', //获取购物车Sample(小样)产品信息
            shoppingCartGetCartMsg: 'shoppingCartGetCartMsg.js', // 获取购物车消息. 在购物车主界面调用
            shoppingCartUpdate: 'shoppingCartUpdate.js', //更新购物车
            shoppingCartSetOffer: 'shoppingCartSetOffer.js',
            shoppingCartDelete: 'shoppingCartDelete.js', //移除购物车产品
            shoppingCartGet: 'shoppingCartGet.js', //获取购物车
            shoppingCartAdd: 'shoppingCartAdd.js',
            getCartSkus:'getCartSkus.js', //获取购物车的SKU列表 <针对付邮试用商品>

            // order
            orderGetList: 'orderGetList.js',
            orderGetDetail: 'orderGetDetail.js',
            checkoutComplete: 'checkoutComplete.js', //提交订单
            orderGetOrderStatus: 'orderGetOrderStatus.js',

            // login
            authGetSignInCaptcha: "authGetSignInCaptcha.js", //获取登陆图形验证码
            authCheckPhoneNumber: "authCheckPhoneNumber.js", //验证手机号，发送短信验证码
            authRegister: "authRegister.js", //注册登录绑定手机号
            authGetPhoneNumber: "authGetPhoneNumber.js", //微信数据解密
            authSignin: 'authSignin.js',
            authIsSignedIn: 'authIsSignedIn.js',
        }
    },
    //接口生产路径
    prod: {
        root: "http://172.25.60.140/household",
        db:10,
        module:'1511',
        token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzFkZGQ2ZWMxYWI0ZjNiYjJjM2NhY2NhZWEzNmZjYyIsImlzcyI6IjEwMTEifQ.4WYSnt93Y4qb8BsUl2QGNZ4enNYJmBw3qN53WskA0_s',
        
        api: {
            //product
            basicInfo: 'user/basicInfo', //上传信息
            addPic:'/company/api/pic'
        }
    },
    share:{
        title: '我的绿色「源 」力     修·护自有一套', // 分享描述
        imageUrl: 'https://assets.esteelauder.com.cn/minipro/Origins/images/wx_share_0316.png'
    },
    //小样产品目录ID
    sampleCategoryId: 'sampleCategoryId',
    //包装配置
    package: {
        boxArr: [{
                code: '1',
                url: '/assets/images/package/box-0.jpg'
            },
            {
                code: '2',
                url: '/assets/images/package/box-1.jpg'
            },
        ],
        ribbonArr: [{
                code: '1',
                url: '/assets/images/package/ribbon-0.jpg'
            },
            {
                code: '2',
                url: '/assets/images/package/ribbon-1.jpg'
            },
            {
                code: '3',
                url: '/assets/images/package/ribbon-2.jpg'
            },
            {
                code: '4',
                url: '/assets/images/package/ribbon-3.jpg'
            },
        ]
    },


    //表单验证
    form: {
        rule: {
            'requied': /\S/ig,
            'email': /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/ig,
            'password': /^[a-zA-Z0-9]{0,30}$/ig,
            'tel': /^1\d{10}$/g,
            'num': /^\d+$/ig,
            'filter': /^[\w\u4e00-\u9fa5]+$/gi,
            'phone': /^[2-9][0-9]{6,7}$/ig,
            'zone': /^0[0-9]{2,3}$/ig,
            "picCode": /^[a-zA-Z0-9]{6,6}$/ig,
            "smsCode": /^[0-9]{6,6}$/ig,
        },
        preset: {
            "password": [{
                    "rule": "requied",
                    "erroMsg": "请输入您的密码"
                },
                {
                    "rule": "password",
                    "erroMsg": "请输入符合规则的密码"
                }
            ],

            "smsCode": [{
                    "rule": "requied",
                    "erroMsg": "请输入您的短信验证码"
                },
                {
                    "rule": "smsCode",
                    "erroMsg": "请输入正确的短信验证码"
                }
            ],


            "picCode": [{
                    "rule": "requied",
                    "erroMsg": "请输入您的图形验证码"
                },
                {
                    "rule": "picCode",
                    "erroMsg": "请输入正确的图形验证码"
                }
            ],

            "tel": [{
                    "rule": "requied",
                    "erroMsg": "请输入您的手机号"
                },
                {
                    "rule": "tel",
                    "erroMsg": "请输入正确的手机格式"
                }
            ],
            "verifycode": [{
                "rule": "requied",
                "erroMsg": "请输入验证码"
            }],
            "name": [{
                "rule": "requied",
                "erroMsg": "请输入姓名"
            }],
            "phone": [{
                    "rule": "requied",
                    "erroMsg": "请输入您的电话号码"
                },
                {
                    "rule": "phone",
                    "erroMsg": "请输入正确的电话号码"
                }
            ],
            "email": [{
                    "rule": "requied",
                    "erroMsg": "请输入邮箱"
                },
                {
                    "rule": "email",
                    "erroMsg": "请输入正确的邮箱格式"
                }
            ],
            "agree": [{
                "rule": ["selected"],
                "erroMsg": "请阅读并同意网站声明",
                "type": "checkbox"
            }],
            "region": [{
                "rule": 0,
                "erroMsg": "请所在地区",
                "type": "picker"
            }],
            "coupon": [{
                "rule": "requied",
                "erroMsg": "请输入优惠代码"
            }],
            "address": [{
                "rule": "requied",
                "erroMsg": "请输入详细地址"
            }],
            "invoice-head": [{
                "rule": "requied",
                "erroMsg": "请输入发票抬头"
            }],
            "invoice-mail": [{
                    "rule": "requied",
                    "erroMsg": "请输入邮箱"
                },
                {
                    "rule": "email",
                    "erroMsg": "请输入正确的邮箱格式"
                }
            ],
        },
    },
}
export default config;