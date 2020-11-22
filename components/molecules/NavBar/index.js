import { useState } from "react";
import { Col, Row, Drawer, Button, Image } from "antd";
import Link from "next/link";
import { LeftMenu, RightMenu } from "../../atoms";
import styles from "./navbar.module.css";

const NavBar = () => {
  const [visible, setvisible] = useState(false);
  const [current, setcurrent] = useState("mail");

  const showDrawer = () => {
    setvisible(true);
  };

  const hideDrawer = () => {
    setvisible(false);
  };

  return (
    <nav className={styles.menuBar}>
      <div className={styles.logo}>
        <Link href="/">
          <a href="/">
            <Image
              width={40}
              height={40}
              src={`${process.env.NEXT_PUBLIC_API_URL}uploads/logo_b71473f73a.jpg`}
              preview={false}
            />
          </a>
        </Link>
      </div>
      <div className={styles.menuCon}>
        <div className={styles.LeftMenu}>
          <LeftMenu />
        </div>
        <div className={styles.RightMenu}>
          <RightMenu />
        </div>
        <Button className={styles.barsMenu} onClick={showDrawer}>
          <span className={styles.barsBtn}></span>
        </Button>
        <Drawer
          title="Basic Drawer"
          placement={"right"}
          closable={false}
          onClose={hideDrawer}
          visible={visible}
        >
          <LeftMenu />
          <RightMenu />
        </Drawer>
      </div>
    </nav>
  );
};

export default NavBar;
