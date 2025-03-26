import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_EVENT } from "../../querys/getEvents.js";
import {
  Layout,
  Card,
  Typography,
  Button,
  Avatar,
  Image,
  Row,
  Col,
  Modal,
  List,
} from "antd";
import style from "./style.module.css";

const { Title, Text } = Typography;

function Event() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { eventId: id },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const event = data?.event || {};
  const participants = event.participants || [];

  return (
    <Layout
      style={{
        padding: "24px",
        display: "flex",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0f4f8, #e0e8f0)",
        minHeight: "100vh",
      }}
    >
      <Card className={style.card} style={{ maxWidth: 800, width: "100%" }}>
        {/* Event Title */}
        <Title level={3} style={{ textAlign: "center", marginBottom: "24px" }}>
          {event.title
            ? event.title.length > 60
              ? `${event.title.substring(0, 60)}...`
              : event.title
            : "Untitled Event"}
        </Title>

        {/* Event Details */}
        <Row gutter={[16, 16]} className={style.eventDetails}>
          <Col span={8}>
            {event.image && (
              <div className={style.imageContainer}>
                <Image
                  src={event.image}
                  alt="Event Image"
                  width="auto"
                  height="auto"
                />
              </div>
            )}
          </Col>
          <Col
            span={16}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>Tarih :</Text> <Text>{event.date || "N/A"}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Saat : </Text>
                <Text>
                  {event.from && event.to
                    ? `${event.from} - ${event.to}`
                    : "N/A"}
                </Text>
              </Col>
              <Col span={12}>
                <Text strong>Konum :</Text>{" "}
                <Text>{event.location?.name || "Bilinmiyor"}</Text>
              </Col>
              <Col span={12}>
                <Text strong style={{ marginRight: "10px" }}>
                  Organizatör :
                </Text>
                <Avatar size="small" style={{ marginRight: "8px" }}>
                  {event.user?.username?.[0] || "U"}
                </Avatar>
                {event.user?.username || "Bilinmiyor"}
              </Col>
              <Col span={22}>
                <Text strong>Açıklama : </Text>
                <Text>{event.desc || "Açıklama yok."}</Text>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Participants */}
        <div className={style.participants}>
          <Text strong>Katılımcılar : </Text>
          {participants.length > 0 ? (
            <div
              className={style.avatarList}
              onClick={() => setIsModalOpen(true)}
              style={{ cursor: "pointer" }}
            >
              {participants.slice(0, 5).map((participant) => (
                <Avatar key={participant?.id} style={{ marginRight: 8 }}>
                  {participant?.user?.username?.[0] || "P"}
                </Avatar>
              ))}
              {participants.length > 5 && (
                <Avatar>+{participants.length - 5}</Avatar>
              )}
            </div>
          ) : (
            <Text>Katılımcı yok</Text>
          )}
        </div>

        {/* Participants Modal */}
        <Modal
          title="Katılımcılar"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <List
            dataSource={participants}
            renderItem={(participant) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar>{participant?.user?.username?.[0] || "P"}</Avatar>
                  }
                  title={participant?.user?.username || "Unknown"}
                />
              </List.Item>
            )}
          />
        </Modal>

        {/* Back Button */}
        <Button
          type="primary"
          onClick={() => window.history.back()}
          style={{ marginTop: 16 }}
        >
          Takvime Dön
        </Button>
      </Card>
    </Layout>
  );
}

export default Event;
