import React, { useState } from "react";
import { Drawer as AntDrawer, Button } from "antd";

const Drawer = ({ data, onCloseDrawer, visible }) => {
  // const [visibleDrawer, setVisibleDrawer] = useState(false);

  // const showDrawer = () => {
  //   setvisibleDrawer(true);
  // };

  // const onCloseDrawer = () => {
  //   setvisibleDrawer(false);
  // };

  return (
    <>
      <AntDrawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onCloseDrawer}
        visible={visible}
      >
        <p>Hola</p>
        <p>{data.person.FirstName}</p>
        <p>{data.person.LastName}</p>
      </AntDrawer>
    </>
  );
};

export default Drawer;
