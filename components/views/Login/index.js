import { Row, Col } from "antd";
import { LoginForm } from "../../organisms";
import { Image, Typography } from "antd";
import styles from "./login.module.css";

const { Title } = Typography;

const Login = () => {
  return (
    <div>
      <Row>
        <Col span={24} className={styles.sifColContainerLogin}>
          <Image
            width={300}
            height={130}
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/logo_b71473f73a.jpg`}
            preview={false}
          />
          <Title level={2} className={styles.loginText}>
            Sistema de Gestión de Productos y RRHH
          </Title>
          <LoginForm />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
