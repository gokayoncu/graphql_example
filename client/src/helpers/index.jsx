import { Badge } from "antd";
import { Link } from "react-router";
import { getListData, getMonthData } from "../hooks/index";
import {UserOutlined, LogoutOutlined, PlusCircleOutlined} from "@ant-design/icons";
import { Menu,Dropdown, Space } from "antd";
import useStore from "../store";

export const monthCellRender = (
  value,
  data,
  loading,
  setCalendarMode,
  setSelectedDate
) => {
  if (!data || loading) return null;

  const monthEvents = getMonthData(value, data.events);
  if (!monthEvents) return null;
  const handleMonthClick = () => {
    setTimeout(() => {
      setCalendarMode("month");
      setSelectedDate(value);
    }, 0);
  };

  return (
    <div
      className="notes-month"
      onClick={handleMonthClick}
      style={{ cursor: "pointer" }}
    >
      <section>{monthEvents}</section>
      <span>Events this month</span>
    </div>
  );
};

export const dateCellRender = (value, data, loading) => {
  if (!data || loading) return null;

  const listData = getListData(value, data.events);
  if (!listData.length) return null;

  const handleClickModal = () => {
    useStore.getState().getData(listData);
    useStore.getState().openModal();
  };

  return (
    <div
      className="events-cell"
      onClick={handleClickModal}
      style={{
        position: "absolute",
        top: 22,
        left: 0,
        right: 0,
        bottom: 0,
        cursor: "pointer",
      }}
    >
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id}>
            <Badge status={item.type} text={item.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const profileMenuItem = (user, closeAlert) => {
  return (
    <>
      {user ? (
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: (
                  <Link to="/createEvents">
                    <Space>
                      <PlusCircleOutlined />
                      Create Events
                    </Space>
                  </Link>
                ),
              },
              {
                key: "2",
                label: (
                  <Link
                    to="/login"
                    onClick={() => {
                      localStorage.removeItem("userInfo");
                      closeAlert();
                    }}
                  >
                    <Space>
                      <LogoutOutlined />
                      Logout
                    </Space>
                  </Link>
                ),
              },
            ]
          }}
        >
          <div style={{ cursor: "pointer" }}>
            <Space>
              <UserOutlined />
              Profile
            </Space>
          </div>
        </Dropdown>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </>
  );
};
