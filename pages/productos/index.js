import React, { useState } from "react";
import { _ as lodash } from "gridjs-react";
import { Table } from "../../components/molecules";
import { ProductDetail, ProductForm } from "../../components/organisms";
import { useWindowDimensions } from "../../commons/useWindowDimensions";
import { useFetch } from "../../commons/useFetch";
import { isBrowser } from "../../commons/isBrowser";
import { generateHeaders } from "../../commons/fetchFunctions";
import { Button, Drawer } from "antd";
import { PrivateRoute } from "../../components/routing";
import { PlusOutlined } from "@ant-design/icons";

const productos = () => {
  /** Variables de estado para la visualizacion de un registro */
  const [visibleProductDetail, setvisibleProductDetail] = useState(false);
  const [currentProduct, setcurrentProduct] = useState(null);

  /** Variables de estado para la creacion de un registro */
  const [visibleProductCreate, setvisibleProductCreate] = useState(false);

  /** INICIO -- FUNCIONES DE VISUALIZACION  DE LOS REGISTROS */

  /** Funcion que acciona el drawer de visualizacion del registro */
  const openProductDetail = (id) => {
    setcurrentProduct(id);
    setvisibleProductDetail(true);
  };

  /** Funcion de accion para cerrar el drawer de visualizacion de los registros */
  const onCloseProductDetail = () => {
    setvisibleProductDetail(false);
  };

  /** FIN -- FUNCIONES DE VISUALIZACION DE LOS REGISTROS */

  /***** INICIO -- FUNCIONES DE CREACION DE UN REGISTRO ****/

  /** Funcion que acciona el drawer de creacion de registro */
  const openProductCreate = () => {
    setvisibleProductCreate(true);
  };

  /** Funcion de accion para cerrar el drawer de creacion de registro */
  const onCloseProductCreate = () => {
    setvisibleProductCreate(false);
  };

  /** FIN -- FUNCIONES DE CREACION DE UN REGISTRO */

  /** Obteniendo el JWT del usuario */
  const getJWT = () => {
    if (isBrowser() && localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      return jwt;
    }
  };

  /** Obteniendo el tamaño de la pantalla y el numero de registros en la tabla */
  const { width } = useWindowDimensions();
  const { response, isLoading } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/count`,
    {
      method: "GET",
    }
  );

  /** Crear las acciones en lo botones de la tabla */
  const actionsCreator = ({ id }) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button type="link" onClick={() => openProductDetail(id)}>
          Ver
        </Button>
        <Button type="link">Editar</Button>
      </div>
    );
  };

  /** Halando la data que va en la tabla */
  const server = {
    url: `${process.env.NEXT_PUBLIC_API_URL}/products?_sort=id:asc`,
    headers: generateHeaders("auth", {
      token: getJWT(),
    }),
    method: "GET",
    then: (data) =>
      data.map((product) => [
        product.ProductNumber,
        product.Name,
        product.SafetyStockLevel,
        product.ReorderPoint,
        lodash(actionsCreator({ id: product.id })),
      ]),
    handle: (res) => {
      // no matching records found
      if (res.status === 404) return { data: [] };
      if (res.ok) return res.json();

      throw Error("oh no :(");
    },
    total: () => (!isLoading ? response : 0),
  };

  /** Haciendo la busqueda en la tabla */
  const search = {
    enabled: true,
    server: {
      url: (prev, keyword) => `${prev}&Name_contains=${keyword}`,
      headers: generateHeaders("auth", { token: getJWT() }),
      method: "GET",
    },
  };

  /** Haciendo la paginacion del contenido de la tabla */
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
        <Button type="primary" onClick={openProductCreate}>
          <PlusOutlined /> Agregar producto
        </Button>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Table
            columns={[
              "Número de Producto",
              "Nombre",
              "Stock de seguridad",
              "Punto de pedido",
              "Acciones",
            ]}
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
            title="Detalle del Producto"
            width={"50%"}
            onClose={onCloseProductDetail}
            visible={visibleProductDetail}
            bodyStyle={{ paddingBottom: 80 }}
          >
            <ProductDetail id={currentProduct} />
          </Drawer>
          <Drawer
            title="Nuevo registro"
            width={"50%"}
            onClose={onCloseProductCreate}
            visible={visibleProductCreate}
            bodyStyle={{ paddingBottom: 80 }}
          >
            <ProductForm />
          </Drawer>
        </div>
      </PrivateRoute>
    </>
  );
};

export default productos;
