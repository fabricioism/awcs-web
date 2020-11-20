import { notification } from "antd";

const NotificationLogin = (type) => {
  return notification[type]({
    message: type === "error" ? "Error" : null,
    description:
      type === "error" ? "Tu usuario o contraseña son inalidos" : null,
  });
};

export default NotificationLogin;
