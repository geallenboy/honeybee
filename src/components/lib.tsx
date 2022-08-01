import { Spin, Typography } from 'antd';
import React from 'react';

//页面loading
export const PageLoading = () => (
  <div className="loading_div">
    <Spin size={'large'} />
  </div>
);

//错误处理
export const PageError = ({ error }: { error: Error | null }) => (
  <div className="loading_div">
    <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
  </div>
);
