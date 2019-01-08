import React from 'react';

import './category-selector.scss';
import MUtil                from 'util/mm.jsx';
import Product              from 'service/product-service.jsx';

const _mm      = new MUtil();
const _product = new Product();

class CategorySelector extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      firstCategoryList   : [],
      firstCategoryId     : 0,
      secondCategoryList  : [],
      secondCategoryId    : 0
    }
  }

  componentDidMount() {
    this.loadFirstCategory();
  }
  componentWillReceiveProps(nextProps) {
    let categoryIdChange        = this.props.categoryId !== nextProps.categoryId,
        parentCategoryIdChange  = nextProps.parentCategoryId !== this.state.parentCategoryId;
    // 数据未发生变化的时候，直接不作处理
    if(!categoryIdChange && !parentCategoryIdChange) {
      return ;
    }
    // 假如只有一级品类
    if(nextProps.parentCategoryId === 0){
      this.setState({
        firstCategoryId : nextProps.categoryId,
        secondCategoryId : 0
      });
    }
    // 有两级
    else {
      this.setState({
        firstCategoryId   : nextProps.parentCategoryId,
        secondCategoryId  : nextProps.categoryId
      }, () => {
        parentCategoryIdChange && this.loadSecondCategory();
      })
    }
  }
  // 加载一级分类
  loadFirstCategory(){
    _product.getCategoryList().then(res => {
      this.setState({
        firstCategoryList : res
      });
    }, errMsg => {
      _mm.errorTips(errMsg);
    })
  }
  // 加载二级分类
  loadSecondCategory(){
    _product.getCategoryList(this.state.firstCategoryId).then(res => {
      this.setState({
        secondCategoryList : res
      });
    }, errMsg => {
      _mm.errorTips(errMsg);
    })
  }
  // 选择一级品类
  onFirstCategoryChange(e) {
    if(this.props.readOnly){
      return;
    }
    let newValue = e.target.value || 0;
    this.setState({
      firstCategoryId     : newValue,
      secondCategoryList  : [],
      secondCategoryId    : 0
    }, () => {
      // 更新二级品类
      this.loadSecondCategory();
      this.onPropsCategoryChange();
    })
  }
  // 选择二级品类
  onSecondCategoryChange(e) {
    if(this.props.readOnly){
      return;
    }
    let newValue = e.target.value || 0;
    this.setState({
      secondCategoryId    : newValue
    }, () => {
      this.onPropsCategoryChange();
    })
  }
  // 传给父组件选中的结果
  onPropsCategoryChange(){
    let categoryChangeble = typeof this.props.onCategoryChange == 'function';
    // 如果有二级品类
    if(this.state.secondCategoryId) {
      // 判断props里的回调函数是否存在
      categoryChangeble && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId)
    }
    // 如果只有一级品类
    else {
      categoryChangeble && this.props.onCategoryChange(this.state.firstCategoryId, 0)
    }
  }
  render() {
    return (
      <div className="col-md-10">
        <select className="form-control cate-select"
          value={this.state.firstCategoryId}
          onChange={(e)=>this.onFirstCategoryChange(e)}
          readOnly={this.props.ReadOnly}>
          <option value="">请选择一级分类</option>
          {
            this.state.firstCategoryList.map(
              (category, index) => <option key={index} value={category.id}>{category.name}</option>
            )
          }
        </select>
        {
          this.state.secondCategoryList.length ? 
          (<select className="form-control cate-select"
            value={this.state.secondCategoryId}
            readOnly={this.props.ReadOnly}
            onChange={(e)=>this.onSecondCategoryChange(e)}>
            <option value="">请选择二级分类</option>
            {
              this.state.secondCategoryList.map(
                (category, index) => <option key={index} value={category.id}>{category.name}</option>
              )
            }
          </select>) : null
        }
      </div>
    )
  }
} 

export default CategorySelector;