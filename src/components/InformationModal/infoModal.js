import { Modal, Descriptions, Image } from "antd";
import avatarImage from '../../assets/images/avatar/admin.jpg';

function InfoModal({ isModalOpen, setIsModalOpen, user }) {
  return (
    <Modal
      title="Admin's information"
      centered
      open={isModalOpen}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
    >
      <Descriptions column={1} >
        <Descriptions.Item><Image height={"12em"} src={avatarImage} /></Descriptions.Item>
        <Descriptions.Item label="Name">{user.realName}</Descriptions.Item>
        <Descriptions.Item label="Gender">{user.gender}</Descriptions.Item>
        <Descriptions.Item label="Telephone">{user.phoneNumber}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Address">{user.address}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}

export default InfoModal;
