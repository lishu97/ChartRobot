class Controller {
  constructor(
    inputBox = '#input',
    recordBox = '#record',
    listTpl = '#listTpl',
    clearBt = '#clearBt',
    sendBt = '#sendBt',
    change = '#changeInputModel',
    userid = 'xiaoyi951125',
    showapi_appid = '54301',
    showapi_sign = '6be1c858b7a94b03bad66576393965f8'
  ) {
    this.inputBox = inputBox
    this.recordBox = recordBox
    this.clearBt = clearBt
    this.sendBt = sendBt
    this.userid = userid
    this.showapi_appid = showapi_appid
    this.showapi_sign = showapi_sign
    this.listTpl = listTpl
    this.change = change
  }
  init() {

    // 点击发送数据
    $(this.sendBt).on('click', (e) => {
      var content = String($(this.inputBox).val()).trim()
      if(content) {
        this.msg(e, this, content)
      }
    })
    // 回车发送数据
    $(this.inputBox).on('keydown', (e) => {
      var content = String($(this.inputBox).val()).trim()
      if(e.key === 'Enter' && content) {
        this.msg(e, this, content)
      }
    })
    // 切换语音输入
    $(this.change).on('mouseup', () => {
      alert('功能开发中，敬请期待！  :)')
    })
    // 解决软键盘挡住输入框的问题
    window.onresize = function () {
      if (document.activeElement.tagName == "INPUT") {
        setTimeout(function () {
          var top = document.activeElement.getBoundingClientRect().top + 500
          window.scrollTo(0,top)
        }, 1000)
      }
    }
    setTimeout(() => {
      const robot = new Robot()
      const user = new User()
    }, 1000)
  }
  msg(e, that, content) {
    const robot = new Robot()
    const user = new User()
    user.send()
    // api接口地址
    var url = 'http://route.showapi.com/60-27?' +
      // 易源数据 -> 个人中心 -> 我的接口 -> 我是接口使用者 -> 我的应用 -> appid
      'showapi_appid=' + that.showapi_appid +
      // 用户说话内容
      '&info=' + content +
      // 用户id（接口要求提供的参数，以便实现结合上下文回答用户）
      '&userid=' + that.userid +
      // 易源数据 -> 个人中心 -> 我的接口 -> 我是接口使用者 -> 我的应用 -> 查看密钥
      '&showapi_sign=' + that.showapi_sign
    
    $.get(url, (data) => {
      robot.showResponse(data)      
    }, 'JSON')
  }
  /*checkOnline() {
    if(window.navigator.onLine === false) {　
      alert("网络未连接，请打开网络后使用");
　　}
　　window.addEventListener("online", online, false);

　　window.addEventListener("offline", offline, false);

　　function online() {  alert("已连接");  }

　　function offline() {  alert("已断开");  }
  }*/
}
