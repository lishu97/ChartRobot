class Robot {
  constructor(
    inputBox = '#input',
    recordBox = '#record',
    listTpl = '#listTpl',
    clearBt = '#clearBt',
    sendBt = '#sendBt',
    change = '#changeInputModel',
    userid = 'xiaoyi5201314',
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
      var content = $(this.inputBox).val()
      if(content) {
        this.msg(e, this, content)
      }
    })
    // 回车发送数据
    $(this.inputBox).on('keydown', (e) => {
      var content = $(this.inputBox).val()
      if(e.key === 'Enter' && content) {
        this.msg(e, this, content)
      }
    })
    /*// 显示清空按钮
    $(this.inputBox).on('keyup', () => {
      console.log($(this.inputBox).val())
      if($(this.inputBox).val()) {
        $(this.clearBt).show()
      }
    });
    // 隐藏清空按钮
    $(this.inputBox).on('blur', () => {
      $(this.clearBt).hide()
    });
    // 清空输入框
    $(this.clearBt).on('click', () => {
      $(this.inputBox).val('')
    })*/
    // 输入框获取焦点
//  $(this.inputBox).on('focus', this.focus);
    // 输入框失去焦点
//  $(this.inputBox).on('blur', this.blur);
    window.onresize = function () {
      if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
        setTimeout(function () {
          var top = document.activeElement.getBoundingClientRect().top;
          window.scrollTo(0,top);
        }, 0);
      }
    }
    // 切换语音输入
    $(this.change).on('mouseup', () => {
      alert('功能开发中，敬请期待！  :)')
    })
  }
  msg(e, that, content) {
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
      if(data.showapi_res_code === 0) {
        // 显示返回文本内容
        $(that.recordBox).html(data.showapi_res_body.text)
        // 如果有文本以外的内容，则显示
        if(data.showapi_res_body.list) {
          let temp = data.showapi_res_body.list[0]
          var html = `
            <a href=${temp.detailurl}>
              <dl>
                <dt style=${'"background-image: url(' + temp.icon + ')"'}></dt>
                <dd>
                  <h4>${temp.name}</h4>
                  <p>${temp.info}</p>
                </dd>
              </dl>
            </a>
          `
          $(that.recordBox).append(html)
        }
      }else {// 接口调用出错
        $(that.recordBox).text('抱歉，出错了，请联系管理员：770383385@qq.com')
      }
    }, 'JSON')
  }
  focus(e) {
    var winobj = $(window),
      scope = this,
      agent = navigator.userAgent.toLowerCase();
    setTimeout(function() {
      if(agent.indexOf('safari') != -1 && agent.indexOf('mqqbrowser') == -1 &&
        agent.indexOf('coast') == -1 && agent.indexOf('android') == -1 &&
        agent.indexOf('linux') == -1 && agent.indexOf('firefox') == -1) { //safra浏览器
        window.scrollTo(0, 1000000); //先滚动到最底部，再用scrollY得到当前的值，必须延迟 否则拿到的就是1000000
        setTimeout(function() {
          window.scrollTo(0, window.scrollY - 45); //45像素 所有浏览器都是这么高
        }, 50)
      } else { //其他浏览器
        window.scrollTo(0, 1000000);
        // window.scrollTo(0, ++this.scrollNum);
      }
    }, 200);
  }
  blur() {
    var agent = navigator.userAgent.toLowerCase();
    setTimeout(function () {
      if (!(agent.indexOf('safari') != -1 && agent.indexOf('mqqbrowser') == -1
        && agent.indexOf('coast') == -1 && agent.indexOf('android') == -1
        && agent.indexOf('linux') == -1 && agent.indexOf('firefox') == -1)) {//非safari浏览器
          window.scrollTo(0, 0);
      }
    }, 0);
  }
}
