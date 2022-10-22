import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { reactElementProps, typeRootState } from '../types/productsType';
import { useSelector } from "react-redux";
import "./layout.css"
import Loading from './Loading';

const { Header, Sider, Content } = Layout;
const LayoutApp: React.FC<reactElementProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { cartItems, loading } = useSelector((state: typeRootState) => state.rootReducer);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  return (
    <Layout>
      {loading && <Loading />}
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
          <div className="cart-items" onClick={() => navigate("/cart")}>
            <ShoppingCartOutlined />
            <span className="cart-size">{cartItems.length}</span>
          </div>
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