import { Result } from 'antd';
import React from 'react';

export default function Page500() {
  return <Result status="500" title="500" subTitle="对不起服务器内部错误." />;
}
