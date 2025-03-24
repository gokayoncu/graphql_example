import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router"; 

const { Header } = Layout;

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      key: "1",
      label: (
        <Link to="/events">Events</Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="/">Home</Link>
      ),
    },
  ];

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="logo" style={{ color: "#fff", fontSize: "20px" }}>
          Logo
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={menuItems}
          style={{
            flex: 1,
            justifyContent: "flex-end",
            display: isMobile ? "none" : "flex",
          }}
        />
        {isMobile && (
          <div style={{ display: "flex" }}>
            <Button
              type="primary"
              icon={<MenuOutlined />}
              onClick={showDrawer}
              style={{ display: "flex", position: "relative" }}
            />
          </div>
        )}
        <Drawer title="Menü" placement="right" open={visible} onClose={onClose}>
          <Menu mode="vertical" defaultSelectedKeys={["1"]} items={menuItems} />
        </Drawer>
      </Header>
    </Layout>
  );
};

export default Navbar;
