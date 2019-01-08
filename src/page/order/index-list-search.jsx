import React from 'react';

class ListSearch extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      orderNumber : 'productId',
    }
  }
  onValueChange(e){
    let name = e.target.name,
        value = e.target.value.trim();
        this.setState({
          [name]:value
        });
  }
  // 点击搜索的时候
  onSearch(){
    this.props.onSearch(this.state.orderNumber);
  }
  // 输入关键字后，回车
  onSearchKeywordUp(e){
    if(e.keyCode === 13) {
      this.onSearch();
    }
  }
  render() {
    return (
      <div className="row search-wrapper">
        <div className="col-md-12">
          <div className="form-inline">
            <div className="form-group">
              <select className="form-control">
                <option>按订单号查询</option>
              </select>
            </div>
            <div className="form-group">
              <input className="form-control"
                 placeholder="订单号"
                 name="orderNumber"
                 onKeyUp={(e)=>this.onSearchKeywordUp(e)}
                 onChange={(e)=>this.onValueChange(e)} />
            </div>
            <button type="btn" 
              className="btn btn-primary"
              onClick={() =>{this.onSearch()}}>搜索</button>
          </div>
        </div>
    </div>
    )
  }
} 

export default ListSearch;