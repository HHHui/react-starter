
import React, { Component } from 'react';
import { Select, Form } from 'antd'
const Option = Select.Option;

let timeout;
let currentValue;
const d = [
  {id: 1, name: "宝贝浴缸"},
  {id: 2, name: "宝贝成长记录日记本"},
  {id: 3, name: "宝贝米粉"},
  {id: 4, name: "宝贝衣服男童套装春秋1-3岁男孩"},
  {id: 5, name: "宝贝童装女童"},
  {id: 6, name: "宝贝 拉拉裤"}
];

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    setTimeout(() => {
      // 在请求的过程中用户修改了搜索关键词.
      if (currentValue === value) {
        callback(d);
      }
    }, 1000)
  }

  timeout = setTimeout(fake, 300);
}
// 封装Select,输出value: object
// 自定义组件要实现受控而非受控两种状态
// 目前实现 受控基本Ok, 非受控0%
// 1.需求
// 1. 必须选中才有值
// 
// 1. problem onSelect之后onChange(obj)
// 2. 没有提供接口自定义input,不能像react-select那样实现一个X
class SearchInput extends React.Component {

  constructor(props){
    super(props);

    const value = props.value || {};

    this.state = {
      data: [],
      value,
      isSelected: false, 
      query: ""
    }
  }

  componentWillReceiveProps(nextProps) {
    if('value' in nextProps) {
      const value = nextProps.value;
      this.setState({value});
    }
  }

  handleChange = (query) => {
    const { isSelected } = this.state;
    if(isSelected) {
      this.triggerChange(null);
    }
    this.setState({ query });
    fetch(query, data => {
      this.setState({ data })
    });
  }

  handleSelect = (value) => {
    this.triggerChange(value);
  }

  handleBlur = () => {
    if(!this.state.value) {
      this.setState({query: ''});
    }
  }

  triggerChange = (value) => {
    const onChange = this.props.onChange;
    if(onChange) {
      if(!value) {
        onChange(null)
        this.setState({isSelected: false})
      }
      for(let d of this.state.data) {
        if(value === d.name) {
          onChange(d);
          this.setState({isSelected: true})
          break;
        }
      }
    }
  }

  render() {
    const options = this.state.data.map(d => <Option key={d.id} value={d.name}>{d.name}</Option>);
    return (
      <Select
        mode='combobox'
        value={this.state.query}
        placeholder={this.props.placeholder}
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onBlur={this.handleBlur}
      >
        {options}
      </Select>
    );
  }
}

@Form.create()
class AntdCustomAjaxSelect extends Component {
  
  // componentDidMount = () => {
  //   const { getFieldsValue } = this.props.form;
  //   setInterval(() => console.log(getFieldsValue()), 1000)
  // }

  onChange = (e) => {
    const { getFieldsValue } = this.props.form;
    setTimeout(() => console.log(getFieldsValue()))
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    
    return (
      <Form>
        {getFieldDecorator('baobei', {
          rules: [{ required: true, message: '请填写宝贝'}],
          onChange: this.onChange
        })(<SearchInput placeholder="input search text" style={{ width: 200 }}/>)}
        {getFieldDecorator('input', {
            rules: [{ required: true, message: '请输入input'}],
          })(<input placeholder="input search text" style={{ width: 200 }}/>)}
      </Form>
    );
  }
}

export default AntdCustomAjaxSelect;