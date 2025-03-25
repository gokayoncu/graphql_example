import { Badge } from 'antd';
import { getListData, getMonthData } from '../hooks/index';
import useStore from '../store';

export const monthCellRender = (value,data, loading) => {
  if (!data || loading) return null;
  const num = getMonthData(value, data.events);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Events this month</span>
    </div>
  ) : null;
};

export const dateCellRender = (value,data, loading) => {
  if (!data || loading) return null;

  const listData = getListData(value, data.events);
  const openModal = useStore((state) => state.openModal);
  const getData = useStore((state) => state.getData);
  const handleClickModal = () => {
    getData(listData); 
    openModal();
  };
  return (
    <ul className="events">
      {listData.map((item) => (
        <li key={item.id}>
          <Badge 
            status={item.type} 
            text={item.title} 
            onClick={() => handleClickModal()}
          />
        </li>
      ))}
    </ul>
  );
};
