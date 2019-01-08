import React      from 'react';
import { Link }   from 'react-router-dom';

import Pagination from 'util/pagination/index.jsx';
import PageTitle  from 'component/page-title/index.jsx';
import MUtil      from 'util/mm.jsx';
import User       from 'service/user-service.jsx';
import TableList  from 'util/table-list/index.jsx';

const _mm   = new MUtil();
const _user = new User();

class UserList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      list         : [],
      pageNum      : 1
    };
  }
  componentDidMount(){
    this.loadUserList();
  }
  loadUserList(){
    _user.getUserList(this.state.pageNum).then(res => {
      this.setState(res);
    }, errMsg => {
      this.setState({
        list: []
      })
      _mm.errorTips(errMsg);
    });
  }
  // 当页数发生变化
  onPageNumChange(pageNum) {
    this.setState({
      pageNum : pageNum
    }, () => {
      this.loadUserList();
    });
  }
  
  render() {
    let listBody = (
      this.state.list.map((user,index) => {
        return (
          <tr key={index}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{new Date(user.createTime).toLocaleDateString()}</td>
          </tr>
        )
      })
    );

    return (
      <div id="page-wrapper">
        <PageTitle title="用户列表" />
          <TableList tableHeads ={['Id','用户名','邮箱','电话','注册时间']}>
            {listBody}
          </TableList>
          <Pagination current={this.state.pageNum} 
            total={this.state.total}
            onChange={(pageNum) => this.onPageNumChange(pageNum)}
            />
      </div>
    );
  }
} 

export default UserList;