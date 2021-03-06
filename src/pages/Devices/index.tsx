import { GlobalOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, List, Typography } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'umi';
import { queryFakeList, queryDeviceByUser, controlDeviceById } from './service';
import type { CardListItemDataType, Device } from './data.d';
import styles from './style.less';
const { Paragraph } = Typography;
import { history } from 'umi';

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  CompassOutlined,
  AlertOutlined,
} from '@ant-design/icons';

const Devices = () => {
  const { data, loading } = useRequest(
    () => {
      return queryDeviceByUser({
        user_id: 12,
      });
    },
    {
      formatResult: (res) => res,
    },
  );

  const controlDevice = async (id: number) => {
    const msg = await controlDeviceById({ device_id: id });
  };

  //   const { data, loading } = useRequest(() => {
  //     return queryFakeList({
  //       count: 5,
  //     });
  //     // return queryDeviceByUser({
  //     //   user_id: 2
  //     // });
  //   }
  // );
  // const data = await queryDeviceByUser({'user_id': 2});

  function converToCardListItem(
    device_list: Device[],
  ): Partial<CardListItemDataType>[] {
    const card_list: Partial<CardListItemDataType>[] = [];
    for (let i = 0; i < device_list.length; i += 1) {
      card_list.push({
        id: `${device_list[i].id}`,
        title: device_list[i].name,
        description: device_list[i].type,
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
        // avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F34%2F56%2F581171e37018e_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644550455&t=7bb0b84ec5c3f7dcab457421f5db22da',
      });
    }
    return card_list;
  }

  console.log('data:', data);

  // const list = data?.list || [];
  const device_list = data || [];
  console.log('device_list', device_list);
  const card_list = converToCardListItem(device_list);

  // Process the raw data into

  const content = (
    <div className={styles.pageHeaderContent}>
      <p>??????????????????????????????</p>
      {/* <div className={styles.contentLink}>
        <a>
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
          ????????????
        </a>
        <a>
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
          ????????????
        </a>
        <a>
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
          ????????????
        </a>
      </div> */}
    </div>
  );

  const extraContent = (
    <div className={styles.extraImg}>
      <img
        alt="??????????????????"
        src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
      />
    </div>
  );
  const nullData: Partial<CardListItemDataType> = {};
  return (
    <PageContainer content={content} extraContent={extraContent}>
      <div className={styles.cardList}>
        <List<Partial<CardListItemDataType>>
          rowKey="id"
          loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          // dataSource={[nullData, ...list]}
          // dataSource={data}
          dataSource={card_list}
          renderItem={(item) => {
            // if (item.description === 'Android'){
            //   const device_class_name = styles.item_android
            // }
            const device_type = item.description;

            if (item && item.id) {
              return (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    className={styles.card}
                    actions={[
                      // <a key="option1">????????????</a>,
                      // <a key="option2">????????????</a>,
                      <GlobalOutlined
                        key="global"
                        onClick={() => {
                          history.push({
                            pathname: '/map',
                            query: { device_id: item.id! },
                          });
                        }}
                      />,
                      <AlertOutlined
                        key="locate"
                        onClick={() => {
                          controlDevice(Number(item.id!));
                        }}
                      />,
                      // <Button size='large'>????????????</Button>,
                      // <Button size='large'>????????????</Button>,
                    ]}
                  >
                    {device_type === 'Android' && (
                      <Card.Meta
                        avatar={
                          <img
                            alt=""
                            className={styles.cardAvatar}
                            src={item.avatar}
                          />
                        }
                        title={<a>{item.title}</a>}
                        description={
                          <Paragraph
                            className={styles.item_android}
                            ellipsis={{ rows: 3 }}
                          >
                            {item.description}
                          </Paragraph>
                        }
                      />
                    )}

                    {device_type === 'Ios' && (
                      <Card.Meta
                        avatar={
                          <img
                            alt=""
                            className={styles.cardAvatar}
                            src={item.avatar}
                          />
                        }
                        title={<a>{item.title}</a>}
                        description={
                          <Paragraph
                            className={styles.item_ios}
                            ellipsis={{ rows: 3 }}
                          >
                            {item.description}
                          </Paragraph>
                        }
                      />
                    )}
                  </Card>
                </List.Item>
              );
            }
            return (
              <List.Item>
                <Button type="dashed" className={styles.newButton}>
                  <PlusOutlined /> ????????????
                </Button>
              </List.Item>
            );
          }}
        />
      </div>
    </PageContainer>
  );
};

export default Devices;
