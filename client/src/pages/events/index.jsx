import React, { useState, useEffect } from "react";
import { Layout, Calendar } from "antd";
import { Content } from "antd/es/layout/layout";
import { useQuery } from "@apollo/client";
import { GET_EVENTS, GET_EVENT_SUBSCRIPTION } from "../../querys/getEvents";
import { dateCellRender, monthCellRender } from "../../helpers";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function Events() {
  
  const { loading, error, data, subscribeToMore } = useQuery(GET_EVENTS, {
    fetchPolicy: 'cache-and-network'
  });
  const [calendarMode, setCalendarMode] = useState("year");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: GET_EVENT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        console.log("Subscription verisi geldi:", subscriptionData);

        if (!subscriptionData.data?.eventCreated) {
          console.warn("Subscription verisi boş");
          return prev;
        }

        const newEvent = subscriptionData.data.eventCreated;

        // Eğer event zaten listede varsa ekleme
        if (prev.events.some((event) => event.id === newEvent.id)) {
          console.log("Event zaten mevcut:", newEvent.id);
          return prev;
        }

        console.log("Yeni event eklendi:", newEvent);
        return {
          ...prev,
          events: [newEvent, ...prev.events], // Yeni eventi başa ekle
        };
      },
      onError: (err) => {
        console.error("Subscription hatası:", err);
      },
    });

    return () => unsubscribe();
  }, [subscribeToMore]);

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
            key={data?.events?.length} // events dizisi değiştiğinde yeniden render
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
