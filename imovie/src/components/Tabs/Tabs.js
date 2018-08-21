import React from 'react';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import Search from '../Search/Search';
import Container from '../Container/Container';
import NorthAmercia from '../NorthAmercia/NorthAmercia';
import  './Tabs.css';

const tabs = [
  { title: <Badge text={'热'}>影池搜索</Badge> },
  { title: <Badge text={'今日(20)'}>国内院线</Badge> },
  { title: <Badge text={'new'}>北美票房榜</Badge> },
];

const TabsComponent = () => (
  <div>
    <Tabs tabs={tabs}
      initialPage={1}
      onChange={(tab, index)  => { console.log('onChange', index, tab); }}
      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
    >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '', backgroundColor: '#fff' }}>
            <Search></Search>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '', backgroundColor: '#fff' }}>
            <Container></Container>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '', backgroundColor: '#fff' }}>
            <NorthAmercia></NorthAmercia>
        </div>
    </Tabs>
  </div>
);
export default TabsComponent;
