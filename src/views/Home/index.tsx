import { Button, Card, Col, Row, DatePicker } from 'antd';
import StatusLineChart from './StatusLineChart';
import ShortCutMenu from './ShortCutMenu';
import EndpointStatistics from './EndpointStatistics';
import style from './home.module.scss';
import DocumentPieChart from './DocumentPieChart';

const { RangePicker } = DatePicker;

/**
 * 首页
 * @returns 组件内容
 */
function Home() {
  return (
    <>
      <Row gutter={8}>
        <Col span={12}>
          <Card className={style.cardTitleBar} style={{ height: '300px' }}>
            欢迎
          </Card>
        </Col>
        <Col span={12}>
          <Card
            style={{ height: '300px' }}
            styles={{ header: { borderBottom: 'none' } }}
            title="快捷菜单"
            extra={
              <Button color="default" variant="filled" size="small">
                配置
              </Button>
            }
          >
            <ShortCutMenu />
          </Card>
        </Col>
      </Row>
      <Row gutter={8} style={{ marginTop: '8px' }}>
        <Col span={12}>
          <Card
            styles={{
              header: { borderBottom: 'none' },
              body: { height: '350px', width: '100%' },
            }}
            title="引擎状态"
          >
            <StatusLineChart />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            styles={{
              header: { borderBottom: 'none' },
              body: { height: '350px' },
            }}
            title="端点统计"
          >
            <EndpointStatistics />
          </Card>
        </Col>
      </Row>
      <Row gutter={8} style={{ marginTop: '8px' }}>
        <Col span={8}>
          <Card
            styles={{
              header: { borderBottom: 'none' },
              body: { height: '450px', width: '100%' },
            }}
            title="请求占比"
          >
            <DocumentPieChart />
          </Card>
        </Col>
        <Col span={16}>
          <Card
            styles={{
              header: { borderBottom: 'none' },
              body: { height: '450px', width: '100%' },
            }}
            title="每日消息统计"
            extra={<RangePicker />}
          >
            菜单
          </Card>
        </Col>
      </Row>
    </>
  );
}
export default Home;
