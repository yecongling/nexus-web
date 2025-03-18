import { Tooltip } from 'antd';
import FullContent from '../icons/FullContent';
import HeaderMixedNav from '../icons/HeaderMixedNav';
import HeaderNav from '../icons/HeaderNav';
import HeaderSidebarNav from '../icons/HeaderSidebarNav';
import MixedNav from '../icons/MixedNav';
import SidebarMixedNav from '../icons/SidebarMixedNav';
import SidebarNav from '../icons/SidebarNav';
import '../Theme/theme.scss';
import './layout.scss';
import { QuestionCircleOutlined } from '@ant-design/icons';

// 预设的布局
const PRESET = [
  {
    name: 'vertical',
    tip: 'verticalTip',
    type: SidebarNav,
  },
  {
    name: 'twoColumn',
    tip: 'twoColumnTip',
    type: SidebarMixedNav,
  },
  {
    name: 'horizontal',
    tip: 'horizontalTip',
    type: HeaderNav,
  },
  {
    name: 'headerSidebarNav',
    tip: 'headerSidebarNavTip',
    type: HeaderSidebarNav,
  },
  {
    name: 'mixedMenu',
    tip: 'mixedMenuTip',
    type: MixedNav,
  },
  {
    name: 'headerTwoColumn',
    tip: 'headerTwoColumnTip',
    type: HeaderMixedNav,
  },
  {
    name: 'fullContent',
    tip: 'fullContentTip',
    type: FullContent,
  },
];
/**
 * 布局
 */
const MyLayout: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        gap: '1.25rem',
      }}
    >
      {PRESET.map((item) => (
        <div
          key={item.name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            width: '100px',
          }}
          onClick={() => {
            console.log(item.name);
          }}
        >
          <div
            className="outline-box"
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <item.type />
          </div>
          <div className="layoutTitle">
            {item.name}
            {item.tip && (
              <Tooltip title={item.tip}>
                <QuestionCircleOutlined
                  style={{
                    fontSize: '.75rem',
                    marginLeft: '.25rem',
                  }}
                />
              </Tooltip>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default MyLayout;
