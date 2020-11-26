import Link from "next/link";
import { Layout as AntLayout, Menu, Image, Dropdown } from "antd";
import { NavBar } from "../molecules";
import { Footer } from "../atoms";
import styles from "./layout.module.css";
import { DownOutlined } from "@ant-design/icons";

// const { SubMenu } = Menu;
const { Header, Content } = AntLayout;

const Layout = ({ children }) => {
  const User = () => {
    return (
      <Menu>
        <Menu.Item key="0">Mi perfil</Menu.Item>
        <Menu.Item key="1">Salir</Menu.Item>
      </Menu>
    );
  };

  return (
    <>
      <AntLayout>
        {/* <NavBar /> */}
        <Header className={styles.siteLayoutBackground}>
          <div className="logo" />
          <Menu
            style={{ display: "flex" }}
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
          >
            <Menu.Item key="1">
              <Link href="/">
                <a>
                  <Image
                    width={130}
                    height={45}
                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/logo_b71473f73a.jpg`}
                    preview={false}
                  />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">Productos</Menu.Item>
            <Menu.Item key="3">Recursos Humanos</Menu.Item>
            <div>
              <Dropdown overlay={User} trigger={["click"]}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                  style={{ color: "black" }}
                >
                  Hola Juan Carlos <DownOutlined />
                </a>
              </Dropdown>
            </div>
          </Menu>
        </Header>
        <AntLayout>
          <Content className={styles.siteLayoutBackground}>{children}</Content>
          <Footer />
        </AntLayout>
      </AntLayout>
    </>
  );
};

export default Layout;
