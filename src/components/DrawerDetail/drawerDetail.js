import { Drawer, Row, Col, Descriptions } from "antd";
import "./drawerDetail.css";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

function DrawerDetail({ isOpen, setOpen, user }) {
  return (
    <>
      <Drawer
        placement="right"
        width="40%"
        open={isOpen}
        onClose={() => setOpen(false)}
      >
        <p style={{ marginBottom: "1em" }}>
          <b>User Information</b>
        </p>
        <Descriptions column={1}>
          <Row>
            <Col span={12}>
              <DescriptionItem title="User name" content={user.username} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Password" content={user.password} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Full Name" content={user.realName} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Gender" content={user.gender} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Phone" content={user.phoneNumber} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Email" content={user.email} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Address" content={user.address} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Position" content={user.role} />
            </Col>
          </Row>
        </Descriptions>
      </Drawer>
    </>
  );
}

export default DrawerDetail;
