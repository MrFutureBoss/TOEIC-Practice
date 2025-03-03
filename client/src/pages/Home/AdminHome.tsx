import React, { useState } from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import '../../styles/AdminHome.css';
import AdminHeader from '../../layouts/AdminHome/Header';
import AdminSider from '../../layouts/AdminHome/Sider';

const { Content } = Layout;

const AdminHome: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className='!h-screen'>
        <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <AdminSider collapsed={collapsed} />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb
            items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
            style={{ margin: '16px 0' }}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};


export default AdminHome;