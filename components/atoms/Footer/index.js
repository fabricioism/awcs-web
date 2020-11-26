import { Layout, Col, Row } from "antd";
import styles from "./footer.module.css";

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ position: "fixed", bottom: "0", width: "100%" }}>
      <Row style={{ width: "100%" }}>
        <Col style={{ width: "100%" }}>
          <Row className={styles.justifyContent}>
            <Col>© {new Date().getFullYear()} Adventure Works Cycle</Col>
          </Row>
        </Col>
      </Row>
    </AntFooter>
  );
};

export default Footer;
