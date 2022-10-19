import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,

} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./layout.css"

const { Header, Sider, Content } = Layout;
type Props = {
  children: JSX.Element,
};
const LayoutApp: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >
          <h2 className="logo-title">
            Point Of sale
          </h2>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>

          <Menu.Item key="/products" icon={<HomeOutlined />}>
            <Link to="/products">Products</Link>
          </Menu.Item>

          <Menu.Item key="/Categories" icon={<HomeOutlined />}>
            <Link to="/Categories">Categories</Link>
          </Menu.Item>
        </Menu>

      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutApp;