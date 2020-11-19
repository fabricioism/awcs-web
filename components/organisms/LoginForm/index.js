import { useRouter } from "next/router";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./loginForm.module.css";
import axios from "axios";

const { Title } = Typography;

const LoginForm = () => {
  const router = useRouter();
  const onFinish = async (values) => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}auth/local`;
    try {
      const { data } = await axios.post(URL, values);
      router.push("/");
    } catch (error) {
      console.log("error", error.response);
    }
  };

  return (
    <Form
      name="normal_login"
      className={styles.lifCard}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Title level={4} className={styles.loginTitleForm}>
        Inicio de sesión
      </Title>
      <Form.Item
        name="identifier"
        rules={[{ required: true, message: "Ingrese su e-mail" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Correo electrónico"
          style={{ width: 300 }}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Ingrese su contraseña" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Contraseña"
          style={{ width: 300 }}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.loginFormButton}
        >
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
