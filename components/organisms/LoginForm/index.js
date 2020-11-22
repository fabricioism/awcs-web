import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Input, Button, Typography, notification } from "antd";
import { NotificationLogin } from "../../atoms";
import styles from "./loginForm.module.css";
import axios from "axios";

const { Title } = Typography;

const LoginForm = () => {
  const [loginError, setloginError] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}auth/local`;
    try {
      const { data } = await axios.post(URL, values);
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("loggedIn", true);
      router.push("/");
    } catch (error) {
      setloginError(true);
    }
  };

  return (
    <>
      {loginError
        ? notification["error"]({
            message: "error",
            description: "Tu usuario o contraseña son invalidos",
          })
        : null}
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
          <Input placeholder="Correo electrónico" style={{ width: 300 }} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Ingrese su contraseña" }]}
        >
          <Input.Password
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
    </>
  );
};

export default LoginForm;
