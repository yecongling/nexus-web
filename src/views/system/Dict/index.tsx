import { App, Card } from 'antd';
import DictSearchForm from './SearchForm';
import type { DictSearchParams } from './api/type';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useParentSize from '@/hooks/useParentSize';
import TableActionButtons from './TableActionButtons';

// 数据字典模块
const Dict: React.FC = () => {
  const { message, modal } = App.useApp();
  // 容器高度计算（表格）
  const { parentRef, height } = useParentSize();
  // 查询参数（包含分页参数）
  const [searchParams, setSearchParams] = useState<DictSearchParams>({
    pageNum: 1,
    pageSize: 20,
  });

  // 查询字典数据
  const {
    isLoading,
    data: result,
    refetch,
  } = useQuery({
    queryKey: ['sys_dict', searchParams],
    queryFn: () => {},
  });

  // 处理搜索
  const handleSearch = (values: DictSearchParams) => {
    const search = {
      ...values,
      pageNum: searchParams.pageNum,
      pageSize: searchParams.pageSize,
    };
    // 判断参数是否发生变化
    if (JSON.stringify(search) === JSON.stringify(searchParams)) {
      // 参数没有变化，手动刷新数据
      refetch();
      return;
    }
    setSearchParams((prev) => ({ ...prev, ...search }));
  };

  // 处理新增
  const handleAdd = () => {};

  // 处理批量删除
  const handleBatchDelete = () => {};

  return (
    <>
      {/* 搜索表单 */}
      <DictSearchForm onSearch={handleSearch} />
      {/* 查询表格 */}
      <Card
        style={{ flex: 1, marginTop: '8px', minHeight: 0 }}
        styles={{ body: { height: '100%' } }}
        ref={parentRef}
      >
        {/* 操作按钮 */}
        <TableActionButtons
          handleAdd={handleAdd}
          handleBatchDelete={handleBatchDelete}
          refetch={refetch}
          selectedRows={[]}
        />

        {/* 表格数据 */}
        
      </Card>
    </>
  );
};
export default Dict;
