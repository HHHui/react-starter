import React, { Component } from "react";
import { Form, Input, Button, Row, Col } from "antd";
const FormItem = Form.Item;

const itemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  }
};

const normalLayout = {
  labelCol: {
    span: 1
  },
  wrapperCol: {
    span: 5
  }
}


class EditReceipt extends Component {
  uuid = 1;
  state = {
    totalAmount: 100
  };

  componentWillMount() {
    console.log(`componentWillMount`);
    const { getFieldProps } = this.props.form;

    getFieldProps("keys", {
      initialValue: [0]
    });
    getFieldProps("amount", {
        initialValue: 0,
        rules: [{ validator: this.validateTotalAmount}]
    });
  }

  validateTotalAmount = (rule, value, callback) => {
    if(parseFloat(value) > this.state.totalAmount){
        callback(`总额不能超过${this.state.totalAmount}`)
    }
    callback()
  }

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(this.uuid);
    this.uuid++;
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  remove = k => () => {
    const { form } = this.props;
    const keys = form.getFieldValue("keys");
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };

  handleUnitPriceOrQuanityChange = (name, index) => event => {
    const { getFieldValue, setFieldsValue, validateFields } = this.props.form;
    const value = event.target.value;
    const other = getFieldValue(
      name === "quantity"
        ? `item[${index}].unitPrice`
        : `item[${index}].quantity`
    );
    const amount = parseFloat(value) * parseFloat(other);
    setFieldsValue(
      {
        [`item[${index}].amount`]: amount ? amount : undefined,
        amount: this.calcAmount(index, amount)
      },
      () => validateFields(['amount'])
    );
  };

  calcAmount = (index, changedAmount) => {
    const { getFieldValue } = this.props.form;
    const trans = amount => amount ? amount : 0;
    return getFieldValue('keys').reduce((amount, k) => {
        return amount + trans(k === index ? changedAmount : getFieldValue(`item[${k}].amount`))
    }, 0)
  }

  handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((errors, values) => {
          if(errors){
            console.log('error', errors, values);
          } else {
            console.log('success', values);
          }
      })
  }
  renderItems = () => {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return getFieldValue("keys").map(k => (
      <Row key={k} gutter={24}>
        <Col span={6}>
          <FormItem label="单价">
            {getFieldDecorator(`item[${k}].unitPrice`)(
              <Input
                onChange={this.handleUnitPriceOrQuanityChange("unitPrice", k)}
              />
            )}
          </FormItem>
        </Col> 
        <Col span={6}>
          <FormItem label="数量">
            {getFieldDecorator(`item[${k}].quantity`)(
              <Input
                onChange={this.handleUnitPriceOrQuanityChange("quantity", k)}
              />
            )}
          </FormItem>
        </Col> 
        <Col span={6}>
          <FormItem label="金额">
            {getFieldDecorator(`item[${k}].amount`)(<Input />)}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem>
            <Button onClick={this.remove(k)}>remove Item</Button>
          </FormItem>
        </Col>
      </Row>
    ));
  };

  render() {
    const { getFieldDecorator, getFieldValue, getFieldError, getFieldsError } = this.props.form;
    const amountError = getFieldError('amount');
    
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="收据编号" {...normalLayout}>
          {getFieldDecorator(`receiptNumber`, {
              rules: [
                { min: 3 },
                { max: 5 },
              ]
          })(<Input/>)}
        </FormItem>
        {this.renderItems()}
        <FormItem 
          validateStatus={amountError ? 'error': ''} 
          help={amountError}>
            {getFieldValue('amount')}
        </FormItem>
        <FormItem>
            <Button onClick={this.add}>Add Item</Button>
            <Button htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

function onValuesChange(props, changed, all) {
  console.log("props, changed, all", changed);
}

export default Form.create({
  onValuesChange
})(EditReceipt);
