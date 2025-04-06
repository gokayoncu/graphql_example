import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Select, Button, message } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_EVENT } from "../../querys/getEvents";
import { GET_LOCATIONS } from "../../querys/getLocation";
import { useNavigate } from "react-router";
import style from './style.module.css';
import useStore from '../../store.js';
const { Option } = Select;

function CreateEvents() {
  const [form] = Form.useForm();
  const [createEvent] = useMutation(CREATE_EVENT);
  const { data } = useQuery(GET_LOCATIONS);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { openAlert,getAlertData } = useStore();
  useEffect(() => {
    if (data) {
      setLocations(data.locations);
    }
  }, [data]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("userInfo")).createUser;
      const formattedDate = values.date
        ? values.date.format("YYYY-MM-DD")
        : null;
      const formattedFrom = values.from ? values.from.format("HH:mm") : null;
      const formattedTo = values.to ? values.to.format("HH:mm") : null;

      await createEvent({
        variables: {
          data: {
            title: values.title,
            desc: values.desc,
            date: formattedDate,
            from: formattedFrom,
            to: formattedTo,
            user_id: String(user.id),
            location_id: String(values.location),
            image: values.image,
          },
        },
      });

      message.success("Event created successfully!");
      form.resetFields();
      getAlertData({ type: "success", message: "Event created successfully!" });
      openAlert();
      navigate("/events");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.formContainer}>
      <h1 className={style.formTitle}>Create New Event</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="title"
          label="Event Title"
          rules={[{ required: true, message: "Please enter event title!" }]}
          className={style.customMargin}
        >
          <Input className={style.inputField} placeholder="Enter event title" />
        </Form.Item>

        <Form.Item
          name="desc"
          label="Description"
          rules={[
            { required: true, message: "Please enter event description!" },
          ]}
          className={style.customMargin}
        >
          <Input.TextArea className={style.textArea} placeholder="Enter event description" rows={4} />
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please select event date!" }]}
          className={style.customMargin}
        >
          <DatePicker className={style.datePicker} style={{ width: "100%" }} format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          name="from"
          label="Start Time"
          rules={[{ required: true, message: "Please select start time!" }]}
          className={style.customMargin}
        >
          <DatePicker
            className={style.datePicker}
            style={{ width: "100%" }}
            showTime
            picker="time"
            format="HH:mm"
          />
        </Form.Item>

        <Form.Item
          name="to"
          label="End Time"
          rules={[{ required: true, message: "Please select end time!" }]}
          className={style.customMargin}
        >
          <DatePicker
            className={style.datePicker}
            style={{ width: "100%" }}
            showTime
            picker="time"
            format="HH:mm"
          />
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: "Please select a location!" }]}
          className={style.customMargin}
        >
          <Select className={style.select} placeholder="Select location">
            {locations.map((location) => (
              <Option key={location.id} value={location.id}>
                {location.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="image" label="Event Image" className={style.customMargin}>
          <Input className={style.imageInput} placeholder="Enter image URL or description" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className={style.submitButton}
          >
            Create Event
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateEvents;
