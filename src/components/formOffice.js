import {Form, DatePicker, Button, Input, Select, InputNumber, message} from 'antd';
import React, { Component } from 'react';
import { connect } from "react-redux";
const Option = Select.Option; 

  class FormO extends Component {
   makeId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  handleSubmit = (e) => {

    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue, text) => {
      if (err) {
        return;
      }
    const id=fieldsValue.id
    
    const offici = { 
    ...fieldsValue,
    'startdate': fieldsValue['startdate'].format('YYYY-MM-DD'),
    Oid: this.makeId(text)
    
    };
      this.props.dispatch({
                type:'CREATE_OFFICE',
                id,offici});
              console.log(offici, id)
              this.props.form.resetFields()
              message.success('a new office is created successfuly');
              });
              
      }

    render() {
      let {companies} = this.props
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit}>
         <Form.Item label="Name">
            {getFieldDecorator('officename', {
                rules: [{ required: true, message: 'Please input office name!', whitespace: true}],
              })(
                <Input placeholder="Name"/>
              )}
          </Form.Item>
          <Form.Item label="Location"
          style={{ marginBottom: 0 }}
          required
          >
                  <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                  {getFieldDecorator('log', {
                          rules: [{ required: true, message: 'Please input Longtitude!'}],
                           })(
                          <InputNumber 
                          type="number" style={{ width: '100%' }} placeholder="Logtitude" min={-180} max={180} step={0.1}  />
                        )}
                  </Form.Item>
                        <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>
                          -
                        </span>
                  <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                        {getFieldDecorator('lat', {
                        rules: [{ required: true, message: 'Please input Latitude!' }],
                          })(
                        <InputNumber type="number" style={{ width: '100%' }} placeholder="Latitude"  min={-90} max={90} step={0.1} />
                        )}
                  </Form.Item>
          </Form.Item>
          <Form.Item label="Office Start Date">
                  {getFieldDecorator('startdate', {
                    rules: [{ type: 'object', required: true, message: 'Please input start date', whitespace: true }],
                  })(
                    <DatePicker placeholder="Office Start Date" />
                  )}
          </Form.Item>
          <Form.Item label="Company">
                {getFieldDecorator('id', {
                  rules: [{required: true, message: 'Select Company!', whitespace: true }],
                })(
                  <Select placeholder="Select Company">
                  {companies.map((company) => 
                  <Option key={company.id} value={company.id} company={company}>{company.companyname}
                  </Option>)}
                </Select>
                )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" className="form-button" htmlType="submit" >Create</Button>
          </Form.Item>
        </Form>
      );
    }
  }

  const mapStateToProps = state => ({
    companies: state.companyData
  });
  const OfficeForm = Form.create()(FormO)
  export default connect(mapStateToProps)(OfficeForm);
