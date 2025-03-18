/**
 * 设置页面的块组件
 * @returns
 */
const Block: React.FC<BlockProps> = ({ title, children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 0' }}>
      <h3
        style={{
          letterSpacing: '-0.4px',
          lineHeight: 1,
          fontWeight: 600,
          margin: '0 0 12px 0',
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
};
export default Block;

export type BlockProps = {
  children?: React.ReactNode;
  title?: string;
};
