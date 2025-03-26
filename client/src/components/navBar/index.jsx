import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router";
const { Header } = Layout;

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const {pathname}= useLocation();
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
        <Link to="/">Home</Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="/events">Events</Link>
      ),
    },
  ];

  const getSelectedKeys = () => {
    if (pathname === "/") return ["1"];
    if (pathname === "/events") return ["2"];
    return ["0"];
  };

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
        selectedKeys={getSelectedKeys()}
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
        <Menu 
          mode="vertical" 
          selectedKeys={getSelectedKeys()} 
          items={menuItems} 
        />
      </Drawer>
    </Header>
  </Layout>
);
};

export default Navbar;
