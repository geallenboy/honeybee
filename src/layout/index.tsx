import { Layout, Spin } from 'antd';
import React from 'react';
import { Outlet } from 'react-router';
import { FooterPage } from './footer';
import { HeaderPage } from './header';
import { SiderPage } from './sider';

const { Content } = Layout;

function ManagerLayout() {
  return (
    <div className="app">
      <Layout>
        <HeaderPage></HeaderPage>
        <Layout>
          <SiderPage />
          <Content>
            <React.Suspense fallback={<Spin size={'large'} />}>
              <div className="app-content">
                <Outlet />
              </div>
            </React.Suspense>
            <FooterPage />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default ManagerLayout;
