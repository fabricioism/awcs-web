import React, { useState } from "react";
import { _ as lodash } from "gridjs-react";
import { EmployeeDetail } from "../../components/organisms";
import { Table } from "../../components/molecules";
import { useWindowDimensions } from "../../commons/useWindowDimensions";
import { useFetch } from "../../commons/useFetch";
import { isBrowser } from "../../commons/isBrowser";
import { generateHeaders } from "../../commons/fetchFunctions";
import { Button, Drawer } from "antd";
import { PrivateRoute } from "../../components/routing";

const rrhh = () => {
  const [visibleEmployeeDetail, setvisibleEmployeeDetail] = useState(false);
  const [CurrentEmployee, setCurrentEmployee] = useState(null);

  const openEmployeeDetail = (id) => {
    setCurrentEmployee(id);
    setvisibleEmployeeDetail(true);
  };

  const onCloseEmployeeDetail = () => {
    setvisibleEmployeeDetail(false);
  };

  const getJWT = () => {
    if (isBrowser() && localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      return jwt;
    }
  };

  const { width } = useWindowDimensions();
  const { response, isLoading } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/employees/count`,
    {
      method: "GET",
    }
  );

  const actionsCreator = ({ id }) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button type="link" onClick={() => openEmployeeDetail(id)}>
          Ver
        </Button>
        <Button type="link">Editar</Button>
      </div>
    );
  };

  const server = {
    url: `${process.env.NEXT_PUBLIC_API_URL}/employees?_sort=id:asc`,
    headers: generateHeaders("auth", {
      token: getJWT(),
    }),
    method: "GET",
    then: (data) =>
      data.map((employee) => [
        employee.id,
        employee.person.FirstName,
        employee.person.LastName,
        employee.Gender,
        lodash(actionsCreator({ id: employee.id })),
      ]),
    handle: (res) => {
      // no matching records found
      if (res.status === 404) return { data: [] };
      if (res.ok) return res.json();

      throw Error("oh no :(");
    },
    total: () => (!isLoading ? response : 0),
  };

  const search = {
    enabled: true,
    server: {
      url: (prev, keyword) => `${prev}&person.FirstName_contains=${keyword}`,
      headers: generateHeaders("auth", { token: getJWT() }),
      method: "GET",
    },
  };

  const pagination = {
    enabled: true,
    limit: 10,
    summary: true,
    server: {
      url: (prev, page, limit) =>
        `${prev}&_start=${page * limit}&_limit=${limit}`,
      headers: generateHeaders("auth", { token: getJWT() }),
      method: "GET",
    },
  };

  return (
    <>
      <PrivateRoute>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Table
            columns={["ID", "Nombre", "Apellido", "Género", "Acciones"]}
            server={server}
            search={search}
            isServer
            sort={true}
            pagination={pagination}
            width={
              width <= 411
                ? width * 0.5
                : width > 411 && width <= 768
                ? width * 0.75
                : width > 768 && width < 1280
                ? width * 0.8
                : width >= 1280 && width < 1400
                ? width * 0.85
                : width * 0.85
            }
          />
          <Drawer
            title="Detalle del Empleado"
            width={"50%"}
            onClose={onCloseEmployeeDetail}
            visible={visibleEmployeeDetail}
            bodyStyle={{ paddingBottom: 80 }}
          >
            <EmployeeDetail id={CurrentEmployee} />
          </Drawer>
        </div>
      </PrivateRoute>
    </>
  );
};

export default rrhh;
