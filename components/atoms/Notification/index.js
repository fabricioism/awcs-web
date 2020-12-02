import { notification } from "antd";

const Notification = ({ type, message, description }) => {
  return notification[type]({
    message: message,
    description: description,
  });
};

export default Notification;
