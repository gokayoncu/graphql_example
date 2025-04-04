import React, { useState, useEffect } from "react";
import { Layout, Calendar } from "antd";
import { Content } from "antd/es/layout/layout";
import { useQuery } from "@apollo/client";
import { GET_EVENTS, GET_EVENT_SUBSCRIPTION } from "../../querys/getEvents";
import { dateCellRender, monthCellRender } from "../../helpers";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import useStore from "../../store";
function Events() {
  const { loading, error, data, subscribeToMore } = useQuery(GET_EVENTS);
  const [calendarMode, setCalendarMode] = useState("year");
  const [selectedDate, setSelectedDate] = useState(null);
  const { openAlert } = useStore();
  useEffect(() => {
    subscribeToMore({
      document: GET_EVENT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        console.log("SUB DATA", subscriptionData);
        if (!subscriptionData.data) return prev;
        openAlert();
        return {
          events: [...prev.events, subscriptionData.data.eventCreated],
        };
      },
    });
  }, []);
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current, data, loading);
    if (info.type === "month")
      return monthCellRender(
        current,
        data,
        loading,
        setCalendarMode,
        setSelectedDate
      );
    return info.originNode;
  };

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout style={{ backgroundColor: "#282c34" }}>
      <Content style={{ padding: "24px" }}>
        <div className="content">
          <h3
            style={{
              fontSize: "24px",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            Events Calendar
          </h3>
          <Calendar
            cellRender={cellRender}
            mode={calendarMode}
            value={selectedDate}
            onPanelChange={(value, mode) => {
              setCalendarMode(mode);
              setSelectedDate(value);
            }}
          />
        </div>
      </Content>
    </Layout>
  );
}

export default Events;
