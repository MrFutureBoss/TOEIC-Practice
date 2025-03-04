import React, { useState } from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import '../../styles/AdminHome.css';
import TeacherHeader from './Header';
import TeacherSider from './Sider';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const TeacherHome: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className='!h-screen'>
        <TeacherHeader collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <TeacherSider collapsed={collapsed} />
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
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};


export default TeacherHome;