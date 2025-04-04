import React, { useState } from "react";
import { Button, Form, Input, message, Typography } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import styles from "./style.module.css";
import { useNavigate } from "react-router";
import useStore from "../../store";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_USER } from "../../querys/getUsers";
const { Title } = Typography;

function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [createUser] = useMutation(ADD_USER);
  const { getAlertData, openAlert } = useStore();
  const { addUsers } = useStore();
  const onFinish = async(values) => {
    const user =await createUser({
      variables: {
        data: {
          email: values.email,
          username:values.username
        },
      },
    });
    addUsers(user.data);
    navigate("/");
    getAlertData({ type: "success", message: "Login successful!" });
    openAlert();
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        <Title level={2} className={styles.loginTitle}>
          Welcome Back
        </Title>
        <div className={styles.loginFormContainer}>
          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            className={styles.loginForm}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please enter your username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className={styles.siteFormItemIcon} />}
                placeholder="Username"
                className={styles.loginInput}
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input
                prefix={<MailOutlined className={styles.siteFormItemIcon} />}
                placeholder="Email"
                type="email"
                className={styles.loginInput}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.loginButton}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
