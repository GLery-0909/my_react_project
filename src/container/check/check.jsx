// 高阶组件来检查权限
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// 通过判断登录状态来进行跳转
export default function(ReceiveComponent) {
  @connect(state => ({ isLogin: state.userInfo.isLogin }), {})
  class NewComponent extends Component {
    render() {
      const { isLogin } = this.props;
      const { pathname } = this.props.location;
      if (!isLogin && pathname === '/admin') return <Redirect to="/login" />;
      if (isLogin && pathname === '/login') return <Redirect to="/admin" />;
      return <ReceiveComponent {...this.props} />;
    }
  }
  return NewComponent;
}
