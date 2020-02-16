import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import logo from './imgs/logo.png';
import './css/login.less';
import { reqLogin } from '../../api';
import { connect } from 'react-redux';
import { createSaveUserInfoAction } from '../../redux/actions/login';
import check from '../check/check';
const { Item } = Form;

@connect(
  state => ({
    userInfo: state.userInfo
  }),
  { saveUserInfo: createSaveUserInfoAction }
)
@Form.create()
@check
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
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // 发送请求
        // console.log('Received values of form: ', values);
        const { username, password } = values;
        let result = await reqLogin(username, password);
        const { status, data, msg } = result;
        if (status === 0) {
          message.success('登录成功');
          this.props.saveUserInfo(data);
          this.props.history.replace('/admin');
        } else {
          message.error(msg);
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    //const {isLogin} = this.props.userInfo
    //if(isLogin) return <Redirect to="/admin"/>
    return (
      <div id="login">
        <div className="header">
          <img src={logo} alt="logo" />
          <h1>商品管理系统</h1>
        </div>
        <div className="content">
          <h1>用户登录</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {/* 
								用户名/密码的的合法性要求
									1). 必须输入
									2). 必须大于等于4位
									3). 必须小于等于12位
									4). 必须是英文、数字或下划线组成
							*/}
              {/* getFieldDecorator('给要装饰的域起个名字',{rules:[{规则1},{{规则2}}]})(要装饰的内容) */}
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: '用户名必须输入' },
                  { max: 12, message: '用户名必须小于等于12位' },
                  { min: 4, message: '用户名必须大于等于4位' },
                  {
                    pattern: /^\w+$/,
                    message: '用户名必须是英文、数字或下划线组成'
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
            <Item>
              {getFieldDecorator('password', {
                rules: [{ validator: this.passwordValidator }]
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

export default Login;
