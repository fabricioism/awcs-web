import Link from "next/link";
import { useRouter } from "next/router";
import { Layout as AntLayout, Menu, Image, Dropdown, Button } from "antd";
import { NavBar } from "../molecules";
import { Footer } from "../atoms";
import { isBrowser } from "../../commons/isBrowser";
import styles from "./layout.module.css";
import { DownOutlined } from "@ant-design/icons";

// const { SubMenu } = Menu;
const { Header, Content } = AntLayout;

const Layout = ({ children }) => {
  const router = useRouter();

  const clearLocalStorage = () => {
    if (isBrowser()) {
      localStorage.clear();
      router.push("/login");
    }
  };

  const getIsLoggedIn = () => {
    if (isBrowser() && localStorage.getItem("loggedIn")) {
      return localStorage.getItem("loggedIn") ? true : false;
    }
  };

  const isLoggedIn = getIsLoggedIn();

  const User = () => {
    return (
      <Menu>
        <Menu.Item key="0">Mi perfil</Menu.Item>
        <Menu.Item key="1">
          <Button
            style={{ justifyContent: "left" }}
            type="text"
            onClick={() => clearLocalStorage()}
          >
            Salir
          </Button>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <>
      <AntLayout>
        {/* <NavBar /> */}
        {isLoggedIn ? (
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
        ) : null}
        <AntLayout>
          <Content className={styles.siteLayoutBackground}>{children}</Content>
          <Footer />
        </AntLayout>
      </AntLayout>
    </>
  );
};

export default Layout;
