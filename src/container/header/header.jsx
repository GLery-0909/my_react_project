import React, { Component } from 'react';
import { Button, Icon, Modal } from 'antd';
import screenfull from 'screenfull';
import { connect } from 'react-redux';
import { reqWeather } from '../../api';
import dayjs from 'dayjs';
import { createDeleteUserInfoAction } from '../../redux/actions/login';
import './header.less';
const { confirm } = Modal;

@connect(state => ({ userInfo: state.userInfo }), {
  deleteUserInfo: createDeleteUserInfoAction
})
class Header extends Component {
  state = {
    // 设置标识符（判断是否全屏）
    isFull: false,
    date: dayjs().format('YYYY年 MM月 DD日 HH:mm:ss'),
    weatherData: { pic: '', temp: '' }
  };

  //退出登录方法
  logout = () => {
    confirm({
      title: '确定退出吗？',
      content: '退出后需要重新登录',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        this.props.deleteUserInfo();
      }
    });
  };

  fullscreen = () => {
    screenfull.toggle();
  };

  getWeatherData = async () => {
    //获取天气数据
    let weatherData = await reqWeather();
    const { temperature, dayPictureUrl } = weatherData;
    this.setState({ weatherData: { pic: dayPictureUrl, temp: temperature } });
  };

  async componentDidMount() {
    screenfull.on('change', () => {
      const isFull = !this.state.isFull;
      this.setState({ isFull });
    });
    this.timeId = setInterval(() => {
      this.setState({ date: dayjs().format('YYYY年 MM月 DD日 HH:mm:ss') });
    }, 1000);
    this.getWeatherData();
  }

  componentWillUnmount() {
    clearInterval(this.timeId);
  }

  render() {
    const { username } = this.props.userInfo.user;
    return (
      <div className="header">
        <div className="header-top">
          <Button size="small" onClick={this.fullscreen}>
            <Icon type={this.state.isFull ? 'fullscreen-exit' : 'fullscreen'} />
          </Button>
          <span>欢迎，{username}</span>
          <Button type="link" onClick={this.logout}>
            退出登录
          </Button>
        </div>
        <div className="header-bottom">
          <div className="bottom-left">
            <span>首页</span>
          </div>
          <div className="bottom-right">
            <span>{this.state.date}</span>
            <img src={this.state.weatherData.pic} alt="天气图标" />
            <span>温度：{this.state.weatherData.temp}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
