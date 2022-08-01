import { Spin } from 'antd';
import React from 'react';

export class LoadingPage extends React.Component<
  React.PropsWithChildren<{
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    data: React.ReactNode;
  }>
> {
  render() {
    const { isLoading, isSuccess, isError, data } = this.props;
    let showDom: React.ReactNode = null;
    if (isLoading) {
      showDom = <Spin size={'large'} tip="数据加载..." />;
    } else {
      if (isSuccess) {
        showDom = data;
      } else if (isError) {
        showDom = <Spin size={'large'} tip="数据失败" />;
      } else {
        showDom = <Spin size={'large'} tip="数据请求..." />;
      }
    }
    return <div>{showDom}</div>;
  }
}
