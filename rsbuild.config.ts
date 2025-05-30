import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginMockServer } from 'rspack-plugin-mock/rsbuild';
import { pluginImageCompress } from '@rsbuild/plugin-image-compress';
import { pluginHtmlMinifierTerser } from 'rsbuild-plugin-html-minifier-terser';
import path from 'node:path';

export default defineConfig({
  plugins: [
    // 表示将react和router相关的包拆分为单独的chunk
    pluginReact({
      splitChunks: {
        react: true,
        router: true,
      },
    }),
    // 将SVG转换为React组件
    pluginSvgr(),
    pluginSass({
      // sass文件默认注入全局的变量文件
      sassLoaderOptions: {
        additionalData: `@use 'src/styles/variables.scss' as *;`,
      },
    }),
    // mock 插件
    pluginMockServer({
      // 表示拦截以路径/api开头的
      prefix: '/api',
    }),
    // 启动图片压缩
    pluginImageCompress(),
    // 启动html压缩
    pluginHtmlMinifierTerser(),
  ],
  // 配置html模板
  html: {
    template: './index.html',
  },
  // 配置路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  dev: {
    // 按需编译
    lazyCompilation: true,
  },
  // 构建产物相关配置
  output: {},
  // 构建优化相关
  performance: {
    chunkSplit: {
      strategy: 'split-by-experience',
      // 下面的部分单独分包
      forceSplitting: {
        axios: /node_modules[\\/]axios/,
        react: /node_modules[\\/]react/,
        antd: /node_modules[\\/]antd/,
        lodash: /node_modules[\\/]lodash/,
        echarts: /node_modules[\\/]echarts/,
        zrender: /node_modules[\\/]zrender/,
        antdIcons: /node_modules[\\/]@ant-design\/icons/,
        'rc-cp': /node_modules[\\/]rc-/,
      },
    },
    // 移除console.[method]语句
    removeConsole: true,
    // 开启包文件分析
    // bundleAnalyze: {},
  },
  // 服务相关
  server: {
    port: 8000,
    proxy: {
      '/api': {
        target: 'http://localhost:8090/fusion',
        changeOrigin: true,
        pathRewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
