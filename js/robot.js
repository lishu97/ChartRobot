// 实现单例模式
const __instance = (function () {
  let instance;
  return (newInstance) => {
    if (newInstance) instance = newInstance;
    return instance;
  }
}());
// 定义机器人类
class Robot {
  constructor(recordBox = '#record', listNum = 3) {
    if(__instance()) {
      return __instance()
    }
    this.recordBox = recordBox
    this.listNum = listNum
    // TODO:输出问候信息
//  let data = {}
//  this.showResponse(data)
    __instance(this)
  }
  showResponse(data) {
    // 接口调用成功
    if(data.showapi_res_code === 0) {
      let list = ''
      let url = ''
      // 如果有文本以外的列表内容
      if(data.showapi_res_body.list) {
        list += '<ul>'
        for(let i = 0; i < this.listNum; i++) {
          let temp = data.showapi_res_body.list[i]
          let info = temp.info.split(' ')
          console.log(info)
          list += `
            <li>
              <a href=${temp.detailurl}>
                <dl>
                  <dt style=${'"background-image: url(' + temp.icon + ')"'}></dt>
                  <dd>
                    <h4>${temp.name}</h4>
                    <p><span>${info[0]}</span><span>${info[1]}</span></p>
                  </dd>
                </dl>
              </a>
            </li>
          `
        }
        list += '</ul>'
      }
      // 如果有文本以外的超链接内容
      if(data.showapi_res_body.url) {
        url += `<a href = ${data.showapi_res_body.url} class = "url"></a>`
      }
      // 显示返回文本内容
      const res = `
        <div class = ".robot">
          ${data.showapi_res_body.text}
          ${url}
          ${list}
        </div>
        `
      $($.parseHTML(res)).appendTo(this.recordBox)
      // FIXME：直接在url的a标签内写文字不能正常显示，原因是文字被渲染到a标签之外，原理不明
      if(data.showapi_res_body.url) {
        $('.url').text('查看结果')
      }
    }else {// 接口调用出错
      alert('抱歉，出错了，请联系管理员：770383385@qq.com')
    }
  }
}
