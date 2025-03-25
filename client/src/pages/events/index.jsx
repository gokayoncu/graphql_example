import React from "react";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Calendar } from "antd";
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "../../querys/getEvents";
import { dateCellRender, monthCellRender } from "../../helpers";
import useStore from "../../store";
function Events() {
  const { loading, error, data } = useQuery(GET_EVENTS);


  const cellRender = (current, info) => {
    if (info.type === "date")
      return dateCellRender(current, data, loading);
    if (info.type === "month")
      return monthCellRender(current, data, loading);
    return info.originNode;
  };

  if (loading) return <div>Loading...</div>;
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
          <Calendar cellRender={cellRender} />
        </div>
      </Content>
    </Layout>
  );
}

export default Events;
