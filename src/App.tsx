import { ConfigProvider } from 'antd';
import React from 'react';
import { ErrorBoundary } from '@/components/error-boudnary';
import { PageError } from '@/components/lib';
import RouterView from '@/router/index';

function App() {
  return (
    <div className="app">
      <ConfigProvider>
        <ErrorBoundary fallbackRender={PageError}>
          <RouterView />
        </ErrorBoundary>
      </ConfigProvider>
    </div>
  );
}

export default App;
