import Link from "next/link";
import { useRouter } from "next/router";
import { Layout as AntLayout, Menu, Image, Dropdown, Button } from "antd";
import { isBrowser } from "../../commons/isBrowser";
import styles from "./layout.module.css";
import { DownOutlined } from "@ant-design/icons";

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

  const getUserName = () => {
    if (isBrowser() && localStorage.getItem("userName")) {
      return localStorage.getItem("userName");
    }
  };

  const userName = getUserName();

  const User = () => {
    return (
      <Menu>
        <Menu.Item key="0">
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
        {isLoggedIn ? (
          <Header className={styles.siteLayoutBackground}>
            <div className="logo" />
            <Menu
              style={{ display: "flex" }}
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
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
              <Menu.Item key="2">
                <Link href="/productos">
                  <a>Productos</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link href="/rrhh">
                  <a>Recursos Humanos</a>
                </Link>
              </Menu.Item>
              <div>
                <Dropdown overlay={User} trigger={["click"]}>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                    style={{ color: "black" }}
                  >
                    {`${userName}`} <DownOutlined />
                  </a>
                </Dropdown>
              </div>
            </Menu>
          </Header>
        ) : null}
        <AntLayout>
          <Content className={styles.siteLayoutBackground}>{children}</Content>
        </AntLayout>
      </AntLayout>
    </>
  );
};

export default Layout;
