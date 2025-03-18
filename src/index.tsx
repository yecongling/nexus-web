import { createRoot } from 'react-dom/client';
import '@/styles/global.scss'; // 引入 Sass 文件
import { BrowserRouter } from 'react-router';
import GlobalConfigProvider from './GlobalConfigProvider';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const container = document.getElementById('root');
if (container) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // 默认所有的useQuery请求都不重试，内部如果有需要重试的，需要手动设置retry: true
      },
    },
  });
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <GlobalConfigProvider />
      </QueryClientProvider>
    </BrowserRouter>,
  );
} else {
  console.error('Root element not found');
}
