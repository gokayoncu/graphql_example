import React from 'react'
import { Layout} from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Calendar, Badge } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_EVENTS} from '../../querys/getEvents';
import { getListData, getMonthData } from '../../hooks';


function Home() {
  const { loading, error, data } = useQuery(GET_EVENTS);

  const monthCellRender = (value) => {
    if (!data || loading) return null;
    const num = getMonthData(value, data.events);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Events this month</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    if (!data || loading) return null;
    const listData = getListData(value, data.events);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout style={{backgroundColor:'#282c34'}}>
      <Content style={{ padding: '24px' }}>
        <div className='content'>
          <h3 style={{ fontSize: '24px', marginBottom: '24px', textAlign: 'center' }}>Events Calendar</h3>
          <Calendar cellRender={cellRender}/>
        </div>
      </Content>
    </Layout>
  )
}

export default Home;