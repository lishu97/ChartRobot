// 实现单例模式
const __userInstance = (function () {
  let userInstance;
  return (newInstance) => {
    if (newInstance) userInstance = newInstance;
    return userInstance;
  }
}());
// 定义用户类
class User {
  constructor(recordBox = '#record') {
    if(__userInstance()) {
      return __userInstance()
    }
    this.recordBox = recordBox
    __userInstance(this)
  }
  send() {
    // 输入的文本内容
    const reqContent = $('#input').val()
    $('#input').val('')
    const req = `
      <div class = "user dialog">
        ${reqContent}
      </div>
      `
    $($.parseHTML(req)).appendTo(this.recordBox)
    $(this.recordBox).scrollTop(9007199254740991)
  }
}
