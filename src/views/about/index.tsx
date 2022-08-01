import { Card, Descriptions, Tag } from 'antd';

import pkg from '../../../package.json';

//关于
export const About = () => {
  const dependencies: any = pkg.dependencies as any;
  const devDependencies: any = pkg.devDependencies;
  const BlankLink = ({ url = '', text = '' }) => (
    <a href={url} target="_blank" rel="noreferrer">
      {text}
    </a>
  );
  return (
    <>
      <Card>
        <Card.Meta
          title="关于"
          description={`${pkg.name}的前端项目是基于react17、Vite2.x、
    antd4.x 、TypeScript4.x、Recoil开发，帮助你快速搭建企业级中后台产品原型。`}
        ></Card.Meta>
      </Card>
      <Card className="mt-3">
        <Descriptions column={2} bordered title="项目信息">
          <Descriptions.Item label="版本">
            <Tag color="processing">{pkg.version}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="最后编译时间">
            <Tag color="processing">{'最后编译时间'}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="GitHub">
            <BlankLink text="GitHub" url={pkg.repository.url} />
          </Descriptions.Item>
          <Descriptions.Item label="预览地址">
            <BlankLink text="预览地址" url={pkg.homepage} />
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card className="mt-3">
        <Descriptions column={2} bordered title="生产环境依赖">
          {Object.keys(dependencies).map((key: any) => {
            // eslint-disable-next-line
            return (
              <Descriptions.Item key={key} label={key}>
                {pkg.dependencies[key]}
              </Descriptions.Item>
            );
          })}
        </Descriptions>
      </Card>
      <Card className="mt-3">
        <Descriptions column={2} bordered title="开发环境依赖">
          {Object.keys(devDependencies).map((key: any) => {
            // eslint-disable-next-line
            return (
              <Descriptions.Item key={key} label={key}>
                {pkg.devDependencies[key]}
              </Descriptions.Item>
            );
          })}
        </Descriptions>
      </Card>
    </>
  );
};

export default About;
