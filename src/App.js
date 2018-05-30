"use strict";
import React, { Component } from 'react';
import logo from './logoneb.png';
import './App.css';
import { Layout, Menu } from 'antd';
import VerifyGoods from './VerifyGoods';
import AddGoods from './AddGoods';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentType: 0
    };
    this.menuItemClick = this.menuItemClick.bind(this);
    // this.renderContent = this.renderContent.bind(this);
  }
  render() {
    return (
      <Layout className='App'>
      <img src={logo} className='neb-logo' alt="logo" />
        <Layout.Header className='header-layout'>商品真伪查询系统</Layout.Header>
        <Layout>
          <Layout.Sider className='slider-layout'>
            <Menu>
              <Menu.Item key='0' onClick={this.menuItemClick}>查询商品</Menu.Item>
              <Menu.Item key='1' onClick={this.menuItemClick}>添加商品信息</Menu.Item>
            </Menu>
          </Layout.Sider>
          <div className='content-layout'>
            {
              this.state.contentType == 0 ? (<VerifyGoods />) : (<AddGoods />)
            }
          </div>
          <Layout.Footer className='footer-layout'>
            本系统基于星云区块链Nebulas Dapp开发
          </Layout.Footer>
        </Layout>
      </Layout>
    );
  }

  menuItemClick(itemData) {
    this.setState(_ => ({
      contentType: itemData.key
    }));

  }

}

export default App;
