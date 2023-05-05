import { Drawer, Radio, Form, Input, Select, notification, Button } from "antd";
import "./drawerDetail.css";

const api_url = "https://json-server-api-j3c7.onrender.com/user";

function DrawerDetail({ isOpen, setOpen, user, fetchData }) {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const handleUpdate = (data) => {
    console.log(data);
    var options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const fetchUpdate = async () => {
      const res = await fetch(`${api_url}/${user.id}`, options);
      const data = await res.json();
      await setOpen(false);
      await fetchData();
    }
    fetchUpdate();

    // update notification
    api["success"]({
      message: "Updated",
      description: "The data has been successfully updated",
    });
  }

  return (
    <>
      {contextHolder}
      <Drawer
        placement="right"
        width="40%"
        open={isOpen}
        onClose={() => setOpen(false)}
      >
        <p style={{ marginBottom: "1em" }}>
          <b>User Information</b>
        </p>
        <Form
          form={form}
          layout="vertical"
          onFinish={(data) => handleUpdate(data)}
        >
          <Form.Item
            label="User name"
            name="username"
            initialValue={user.username}
            rules={[
              {
                required: true,
                message: "Please enter a user name",
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            initialValue={user.password}
            rules={[
              {
                required: true,
                message: "Please enter a password",
              }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Full name"
            name="realName"
            initialValue={user.realName}
            rules={[
              {
                required: true,
                message: "Please enter user's fullname",
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            initialValue={user.gender}
          >
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phoneNumber"
            initialValue={user.phoneNumber}
            rules={[
              {
                required: true,
                message: "Please enter a phone number",
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            initialValue={user.email}
            rules={[
              {
                required: true,
                message: "Please enter an email",
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            initialValue={user.address}
            rules={[
              {
                required: true,
                message: "Please enter user's address",
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Position"
            name="role"
            initialValue={user.role}
          >
            <Select>
              <Select.Option value="manager">manager</Select.Option>
              <Select.Option value="staff">staff</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Save</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default DrawerDetail;
