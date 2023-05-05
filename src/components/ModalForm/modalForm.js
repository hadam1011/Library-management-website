import { Form, Modal, Input, Radio, Select, notification } from "antd";

const { Option } = Select;
const api_url = "https://json-server-api-j3c7.onrender.com/user";

function ModalForm({ isModalOpen, setModalOpen, userList, setUserList }) {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  // check user name exist
  const checkExist = (value) => {
    for (const user of userList) {
      if (user.username === value) return true;
    }
    return false;
  };

  const handleFormSubmit = (value) => {
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    };

    const fetchCreate = async () => {
      await fetch(api_url, options)
        .then((res) => res.json())
    }

    fetchCreate();
    setUserList([...userList, value]);

    // create notification
    api['success']({
      message: "Created",
      description:
        "New data has been successfully created",
    });
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        title="Creat new user"
        onCancel={() => setModalOpen(false)}
        okText="Submit"
        onOk={() => {
          form.validateFields()
            .then((value) => {
              handleFormSubmit(value);
              setModalOpen(false);
            });
        }}
      >
        {contextHolder}
        <Form form={form} layout="vertical">
          <Form.Item
            label="User name"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter a user name",
              },
              {
                type: "string",
                whitespace: true,
                message: "User name can not be start with whitespace",
              },
              () => ({
                validator(_, value) {
                  if (!checkExist(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("User name has been exist"));
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            extra="password must contain uppercase letter (First letter), lowercase letter, digit and should be more than 5 characters"
            rules={[
              {
                required: true,
                message: "Please enter an password",
              },
              () => ({
                validator(_, value) {
                  if (/^[A-Z](?=.*\d)+(?=.*[a-z])+/.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Please enter an valid password")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Position"
            name="role"
            rules={[
              {
                required: true,
                message: "Please select user's role",
              },
            ]}
          >
            <Select allowClear>
              <Option value="admin">manager</Option>
              <Option value="user">staff</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="realName"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please enter a name",
              },
              {
                type: "string",
                whitespace: true,
                message: "Name can not be start with whitespace",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please choose user's gender",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please enter phone number",
              },
              {
                type: "string",
                whitespace: true,
                message: "Phone number can not be start with whitespace",
              },
              () => ({
                validator(_, value) {
                  if (/^0[7-9][0-9]{8}$/.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Please enter valid phone number")
                  );
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter an email",
              },
              {
                type: "string",
                whitespace: true,
                message: "Email can not be start with whitespace",
              },
              () => ({
                validator(_, value) {
                  if (
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Please enter an valid email")
                  );
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please enter an address",
              },
              {
                type: "string",
                whitespace: true,
                message: "An Address can not be start with whitespace",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalForm;
