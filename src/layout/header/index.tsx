import './style.less';

import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Col, Layout, Row, Space } from 'antd';

import logoImg from '@/assets/images/logo.svg';

const { Header } = Layout;

export const HeaderPage = () => {
  const user = { name: '123' };
  return (
    <Header className="app-header">
      <Row justify="space-between" className="herder-height">
        <Col span={12} className="col_left">
          <Space align="center" size={'small'}>
            <Avatar className="logoImg" src={logoImg} />
            <h1>react管理系统</h1>
          </Space>
        </Col>
        <Col span={12} className="col_right">
          <Space>
            <span className="dropdown-link">{user?.name}</span>
            <LogoutOutlined />
          </Space>
        </Col>
      </Row>
    </Header>
  );
};
