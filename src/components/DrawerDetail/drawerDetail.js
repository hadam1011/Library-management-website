import { Drawer, Radio, Form, Input, Select, notification } from "antd";
import "./drawerDetail.css";

const api_url = "https://json-server-api-j3c7.onrender.com/user";

function DrawerDetail({ isOpen, setOpen, user }) {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const handleUpdate = (data, id) => {
    var options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    async function fetchUpdate() {
      await fetch(`${api_url}/${id}`, options)
        .then((res) => res.json())
        .then(() => {
          fetchData();
        });
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
          onSubmit={(data) => handleUpdate(data, user.id)}
        >
          <Form.Item
            label="User name"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter a user name",
              }
            ]}
          >
            <Input defaultValue={user.username}/>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter a password",
              }
            ]}
          >
            <Input.Password defaultValue={user.password}/>
          </Form.Item>
          <Form.Item
            label="Full name"
            name="realName"
            rules={[
              {
                required: true,
                message: "Please enter user's fullname",
              }
            ]}
          >
            <Input defaultValue={user.realName}/>
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
          >
            <Radio.Group defaultValue={user.gender}>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
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
            name="position"
          >
            <Select defaultValue={user.role}>
              <Select.Option value="admin">manager</Select.Option>
              <Select.Option value="user">staff</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="submit" htmlType="submit">Save</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default DrawerDetail;
