import 'antd/dist/antd.less';
import './assets/styles/index.less';
import { createRoot } from 'react-dom/client';
import { FocaProvider } from 'foca';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import '@/store';

const rootElement: Element = document.getElementById('root') as Element;
const root = createRoot(rootElement);
root.render(
  <BrowserRouter>
    <FocaProvider>
      <App />
    </FocaProvider>
  </BrowserRouter>
);
