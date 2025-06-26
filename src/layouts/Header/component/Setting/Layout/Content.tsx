import ContentCompact from '../icons/ContentCompact';
import HeaderNav from '../icons/HeaderNav';
import './layout.scss';

/**
 * 预设内容布局
 */
const PRESET = [
  {
    name: 'wide',
    type: HeaderNav,
  },
  {
    name: 'compact',
    type: ContentCompact,
  },
];

/**
 * 内容设置
 * @returns
 */
const Content: React.FC = () => {
  return (
    <div style={{ display: 'flex', width: '100%', gap: '1.25rem' }}>
      {PRESET.map((item) => (
        <div key={item.name} style={{ width: '100px', cursor: 'pointer', flexDirection: 'column' }}>
          <div className="outline-box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {(() => {
              const Comp = item.type;
              return <Comp />;
            })()}
          </div>
          <div className="layoutTitle">{item.name}</div>
        </div>
      ))}
    </div>
  );
};
export default Content;
