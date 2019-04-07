import {Form, Button, Input,InputNumber, Select, message} from 'antd';
import React, { Component } from 'react';
import { connect } from "react-redux";

import id from './svgFlags/id.svg'
import my from './svgFlags/my.svg'
import sg from './svgFlags/sg.svg'
import th from './svgFlags/th.svg'
import fp from './svgFlags/fp.svg'

const Option = Select.Option;
const InputGroup = Input.Group;

  class FormC extends Component {

    // Generates an ID
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
              const company = {
              ...fieldsValue,
              id: this.makeId(text),
              offices:[]
              };
                this.props.dispatch({
                          type:'CREATE',
                          company});
                        console.log(company)
                        this.props.form.resetFields()
                        });    
                        message.success('a new company is created successfuly');
                }

    render() {
        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('code', {
          rules: [{ required: true, message: 'Please input your phone number!' }],
          initialValue:'+62'
          })(
            <Select style={{width:'100%'}}>
              <Option value='+62'>
              <img src={id} alt="id" className="flag"/> +62              
              </Option>
              <Option value='+60'>
              <img src={my} alt="my" className="flag"/> +60         
              </Option>
              <Option value='+65'>
              <img src={sg} alt="sg" className="flag"/> +65              
              </Option>
              <Option value='+66'>
              <img src={th} alt="th" className="flag"/> +66              
              </Option>
              <Option value="+63">
              <img src={fp} alt="fp" className="flag"/> +63              
              </Option>
            </Select>
          );
      return (
        <Form onSubmit={this.handleSubmit}>
         <Form.Item label="Name">
         {getFieldDecorator('companyname', {
            rules: [{ required: true, message: 'Please input your Company name!' }],
          })(
            <Input placeholder="Name"
            />
          )}
          </Form.Item>
          <Form.Item label="Address">
          {getFieldDecorator('address', {
            rules: [{ required: true, message: 'Please input your Address!' }],
          })(
            <Input placeholder="Address"
            />
          )}
          </Form.Item>
          <Form.Item label="Revenue">
        {getFieldDecorator('revenue', {
            rules: [{ required: true, message: 'Please input your revenue!' }],
          })(
            <InputNumber placeholder="Revenue"
            maxLength="5"
            style={{width:'100%'}}
            min={0} 
            />
          )}
         
          </Form.Item>
          <Form.Item label="Phone Number" 
              style={{ marginBottom: 0 }}
              required
          >

            <InputGroup>
            <Form.Item style={{ display: 'inline-block', width: 'calc(40% - 12px)' }}>
            {prefixSelector}
            </Form.Item>
            <span style={{ display: 'inline-block', width: '20px', textAlign: 'center' }}>
            </span>
            <Form.Item style={{ display: 'inline-block', width: 'calc(60% - 12px)' }}>
          {getFieldDecorator('phonumb', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <InputNumber
            maxLength="11"
            minLength="5"
            style={{ width: '100%' }}
            min={0}
            />
            )}
            </Form.Item>
            </InputGroup>
          
        </Form.Item>
          <Form.Item>
            <Button className="form-button" type="primary" htmlType="submit" >Create</Button>
          </Form.Item>
        </Form>
      );
    }
  }

  const CompanyForm = Form.create()(FormC)
  export default connect(null)(CompanyForm);