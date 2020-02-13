import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import axios from 'axios';
import logo from './imgs/logo.png';
import './css/login.less';
const { Item } = Form;

class Login extends Component {
  // 密码校验函数
  pwdValidator = (rule, value, callback) => {
    if (!value) {
      callback('密码为必填项');
    } else if (value.length > 12) {
      callback('密码不得超过12位');
    } else if (value.length < 4) {
      callback('密码不得少于4位');
    } else if (!/^\w+$/.test(value)) {
      callback('密码必须是数字、英文或者下划线组成');
    } else {
      callback();
    }
  };
  // 提交表单收集数据
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 发送请求
        // console.log('Received values of form: ', values);
        const { username, password } = values;
        axios
          .post(
            // 注意跨域问题
            'http://localhost:3000/login',
            // 这种携带参数方式不会打成json
            `username=${username}&password=${password}`
          )
          .then(
            response => {
              console.log(response.data);
            },
            error => {
              console.log(error);
            }
          );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="login">
        <div className="header">
          <img src={logo} alt="logo" />
          <h1>商品管理系统</h1>
        </div>
        <div className="content">
          <h1> 用户登录</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            {/* 声明方式验证 */}
            <Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: '用户名必须输入' },
                  { max: 12, message: '用户名必须小于或等于12位' },
                  { min: 4, message: '用户名必须大于或等于4位' },
                  {
                    pattern: /^\w+$/,
                    message: '用户名必须是数字、英文或者下划线组成'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Item>
            {/* 自定义校验 */}
            <Item>
              {getFieldDecorator('password', {
                rules: [{ validator: this.pwdValidator }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Item>
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(Login);
