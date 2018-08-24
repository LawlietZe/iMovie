import React from 'react';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import Search from '../Search/Search';
import Container from '../Container/Container';

const tabs = [
  { title: <Badge text={'3'}>影池搜索</Badge> },
  { title: <Badge text={'今日(20)'}>最近热映</Badge> },
  { title: <Badge text={'new'}>发现</Badge> },
];

const TabsComponent = () => (
  <div>
    <WhiteSpace  />
    <Tabs tabs={tabs}
      initialPage={1}
      swipeable={false}
      onChange={(tab, index) => { console.log('onChange', index, tab); }}
      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
    >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '', backgroundColor: '#fff' }}>
            <Search></Search>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '', backgroundColor: '#fff' }}>
            <Container></Container>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
            Content of third tab
        </div>
    </Tabs>
  </div>
);
export default TabsComponent;
