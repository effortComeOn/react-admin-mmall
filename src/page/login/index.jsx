import React  from 'react';
import MUtil  from 'util/mm.jsx';
import User   from 'service/user-service.jsx';

import './index.scss';

const _mm   = new MUtil();
const _user = new User();

class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username :'',
      password :'',
      redirect: _mm.getUrlParam('redirect') || '/'
    }
  }
  componentWillMount() {
    document.title = '登录 - MMall ADMIN'
  }
  // username,password change
  onInputChange(e) {
    let inputName  = e.target.name,
        inputValue = e.target.value;
    this.setState({
      [inputName] : inputValue
    })
  }
  // password
  onSubmit(e) {
    let loginInfo = {
      username: this.state.username,
      password: this.state.password
    },
    checkResult = _user.checkLoginInfo(loginInfo);
    // 验证通过
    if(checkResult.status) {
        _user.login(loginInfo).then((res)=>{
          _mm.setStorage('userInfo', res);
          this.props.history.push(this.state.redirect);
      },(errMsg)=>{
          _mm.errorTips(errMsg);
      })
    }
    // 验证不通过
    else {
      _mm.errorTips(checkResult.msg);
    }
  }
  // 输入回车登录
  onInputKeyUp(e) {
    if(e.keyCode === 13) {
      this.onSubmit();
    }
  }
  render() {
    return (
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default login-panel">
            <div className="panel-heading">欢迎登录-HAPPY MMALL</div>
            <div className="panel-body">
            <div>
              <div className="form-group">
                <input type="text" 
                  className="form-control" 
                  placeholder="请输入用户名"
                  name="username"
                  onKeyUp = {e => this.onInputKeyUp(e)}
                  onChange = { e => this.onInputChange(e)} />
              </div>
              <div className="form-group">
                <input type="password" 
                  className="form-control"  
                  placeholder="请输入密码"
                  name="password"
                  onKeyUp = {e => this.onInputKeyUp(e)}
                  onChange = { e => this.onInputChange(e)}/>
              </div>
              <button className="btn btn-primary btn-lg btn-block"
                onClick={e => {this.onSubmit(e)}}>登录</button>
            </div>
            </div>
          </div>
        </div>
    );
  }
} 

export default Login;