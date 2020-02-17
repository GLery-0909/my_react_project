import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createSaveTitleAction } from '../../redux/actions/header';
import menus from '../../config/menu-config';
import logo from '../../static/imgs/logo.png';
import './left_nav.less';
const { SubMenu, Item } = Menu;

@connect(state => ({ title: state.headerTitle }), {
  saveTitle: createSaveTitleAction
})
@withRouter
class left_nav extends Component {
  getTitle = () => {
    let title = '';
    let { pathname } = this.props.location;
    if (pathname === '/admin') pathname = '/admin/home';
    let currentKey = pathname.split('/').reverse()[0];
    menus.forEach(menuObj => {
      if (menuObj.children instanceof Array) {
        let result = menuObj.children.find(childMenu => {
          return childMenu.key === currentKey;
        });
        if (result) title = result.title;
      } else {
        if (menuObj.key === currentKey) title = menuObj.title;
      }
    });
    this.props.saveTitle(title);
  };

  componentDidMount() {
    if (!this.props.title) {
      this.getTitle();
    }
  }

  createMenu = menuArr => {
    return menuArr.map(menuObj => {
      if (!menuObj.children) {
        return (
          <Item
            key={menuObj.key}
            onClick={() => {
              this.props.saveTitle(menuObj.title);
            }}
          >
            <Link to={menuObj.path}>
              <Icon type={menuObj.icon} />
              <span>{menuObj.title}</span>
            </Link>
          </Item>
        );
      } else {
        return (
          <SubMenu
            key={menuObj.key}
            title={
              <span>
                <Icon type={menuObj.icon} />
                <span>{menuObj.title}</span>
              </span>
            }
          >
            {this.createMenu(menuObj.children)}
          </SubMenu>
        );
      }
    });
  };

  render() {
    const { pathname } = this.props.location;
    let openKey = pathname.split('/');
    let selectedKey = pathname.split('/').reverse()[0];
    return (
      <div className="left-nav">
        <div className="nav-top" name="lis">
          <img src={logo} alt="logo" />
          <h1>商品管理系统</h1>
        </div>
        <div>
          <Menu
            selectedKeys={[selectedKey]}
            defaultOpenKeys={openKey}
            mode="inline"
            theme="dark"
          >
            {this.createMenu(menus)}
          </Menu>
        </div>
      </div>
    );
  }
}

export default left_nav;
