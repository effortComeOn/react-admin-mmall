class MUtil {
  request(parma) {
    return new Promise((resolve,reject)=>{
      $.ajax({
        type      : parma.type      || 'get',
        url       : parma.url       || '',
        dataType  : parma.dataType  || 'json',
        data      : parma.data      || null,
        success   : (res) =>{
          // 数据请求成功
          if( 0 === res.status){
            typeof resolve ==="function" && resolve(res.data, res.msg);
          }
          // 没有登录状态,强制登录
          else if( 10 === res.status) {
            this.doLogin();
          }else {
            typeof reject ==="function" && reject(res.msg, res.data);
          }
        },
        error   : (err) =>{
          typeof reject ==="function" && reject(err.statusText);
        }
      })
    })
  }

  // 跳转登陆
  doLogin() {
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname) ;
  }
  // 获取url参数
  getUrlParam(name) {
    let queryString = window.location.search.split('?')[1] || '',
        reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
        result      = queryString.match(reg);
    return result ? decodeURIComponent(result[2]) : null ;
  }
  // 错误处理
  successTips(successMsg) {
    alert(successMsg || '操作成功！');
  }
  // 错误处理
  errorTips(errMsg) {
    alert(errMsg || '好像哪里不对了');
  }
  // 添加本地存储
  setStorage(name, data) {
    let dataType = typeof data;
    if(dataType === 'object') {
      window.localStorage.setItem(name, JSON.stringify(data))
    }
    // 基础类型
    else if(['number','string','boolean'].indexOf(dataType) >= 0){
      window.localStorage.setItem(name, data)
    }
    // 其他不支持类型
    else{
      alert('该类型不能用于本地存储');
    }
  }
  // 取出本地存储的内容
  getStorage(name) {
    let data = window.localStorage.getItem(name);
    if(data) {
      return JSON.parse(data);
    }
    else{
      return '';
    }
  }
  removeStorage(name) {
    window.localStorage.removeItem(name);
  }
}

export default MUtil;