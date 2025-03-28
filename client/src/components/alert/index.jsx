import React, { useEffect } from "react";
import { Alert } from "antd";
import useStore from "../../store";
import style from "./style.module.css";

function index() {
  const { closeAlert, alert } = useStore();
  const handleClose = () => {
    closeAlert();
  };
  useEffect(() => {
    setInterval(() => {
      handleClose();
    }, 2500);
  }, []);

  return (
    <>
      {alert.isModalOpen && (
        <Alert
          message={alert.data.message}
          type={alert.data.type}
          className={style.alert}
          closable
          afterClose={handleClose}
        />
      )}
    </>
  );
}

export default index;
