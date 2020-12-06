import React, { useState, useEffect } from "react";
import { _ as lodash } from "gridjs-react";
import { Table } from "../../components/molecules";
import {
  ProductDetail,
  ProductForm,
  ProductUpdate,
} from "../../components/organisms";
import { useWindowDimensions } from "../../commons/useWindowDimensions";
import { useFetch } from "../../commons/useFetch";
import { isBrowser } from "../../commons/isBrowser";
import { generateHeaders } from "../../commons/fetchFunctions";
import {
  categories,
  subCategories,
  categoriesIds,
} from "../../commons/categories";
import {
  Button,
  Drawer,
  Typography,
  notification,
  Switch,
  Row,
  Col,
  Select,
} from "antd";
import { PrivateRoute } from "../../components/routing";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;

const productos = () => {
  /** Variables de estado para los filtros */
  const [showFilters, setshowFilters] = useState(false);
  const [subCategoriesState, setsubCategoriesState] = useState(
    subCategories[categories[0]]
  );
  const [secondSubCategory, setsecondSubCategory] = useState(
    subCategories[categories[0]][0]
  );

  /** Variables de estado para la visualizacion de un registro */
  const [visibleProductDetail, setvisibleProductDetail] = useState(false);
  const [currentProduct, setcurrentProduct] = useState(null);

  /** Variables de estado para la creacion de un registro */
  const [showNotification, setshowNotification] = useState(false);
  const [isSuccess, setisSuccess] = useState(null);
  const [visibleProductCreate, setvisibleProductCreate] = useState(false);

  /** variables de estado para la edicion de un registro */
  const [showNotificationUpdate, setshowNotificationUpdate] = useState(false);
  const [isSuccessUpdate, setisSuccessUpdate] = useState(null);
  const [visibleProductUpdate, setvisibleProductUpdate] = useState(false);

  /** INICIO FILTROS */
  const onChangeFilter = (value) => {
    setshowFilters(value);
  };

  const handleCategoriesChange = (value) => {
    setsubCategoriesState(subCategories[value]);
    setsecondSubCategory(subCategories[value][0]);
  };

  const onSecondCategoryChange = (value) => {
    setsecondSubCategory(value);
  };

  const getSubCategoryId = (value) => {
    return categoriesIds[value];
  };
  /** FIN FILTROS */

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

  /** INICIO -- FUNCIONES DE EDICION  DE LOS REGISTROS */

  /** Funcion que acciona el drawer de EDICION del registro */
  const openProductUpdate = (id) => {
    setshowNotificationUpdate(false);
    setvisibleProductUpdate(true);
    setisSuccessUpdate(null);
    setcurrentProduct(id);
  };

  /** Funcion de accion para cerrar el drawer de EDICION de los registros */
  const onCloseProductUpdate = () => {
    setvisibleProductUpdate(false);
    setshowNotificationUpdate(false);
  };

  /** FIN -- FUNCIONES DE EDICION DE LOS REGISTROS */

  /***** INICIO -- FUNCIONES DE CREACION DE UN REGISTRO ****/

  /** Funcion que acciona el drawer de creacion de registro */
  const openProductCreate = () => {
    setshowNotification(false);
    setvisibleProductCreate(true);
    setisSuccess(null);
  };

  /** Funcion de accion para cerrar el drawer de creacion de registro */
  const onCloseProductCreate = () => {
    setvisibleProductCreate(false);
    setshowNotification(false);
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
        <Button type="link" onClick={() => openProductUpdate(id)}>
          Editar
        </Button>
      </div>
    );
  };

  /** Halando la data que va en la tabla */
  const server = {
    url: !showFilters
      ? `${process.env.NEXT_PUBLIC_API_URL}/products?_sort=id:asc`
      : `${
          process.env.NEXT_PUBLIC_API_URL
        }/products?product_subcategory.id_eq=${getSubCategoryId(
          secondSubCategory
        )}`,
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

  /** Gestion de las notificaciones de creacion de creacion */
  useEffect(() => {
    if (isSuccess) {
      setshowNotification(true);
      setvisibleProductCreate(false);
    } else if (isSuccess != null) {
      setshowNotification(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessUpdate) {
      setshowNotificationUpdate(true);
      setvisibleProductUpdate(false);
    } else if (isSuccessUpdate != null) {
      setvisibleProductUpdate(true);
    }
  }, [isSuccessUpdate]);

  return (
    <>
      <PrivateRoute>
        {showNotification && isSuccess != null
          ? notification[isSuccess ? "success" : "error"]({
              message: isSuccess ? "Éxito" : "Error",
              description: isSuccess
                ? "Registro guardado"
                : "Hubo un error al guardar, el campo 'Número de producto' debe ser único",
              placement: isSuccess ? "topRight" : "bottomRight",
              duration: 2,
            })
          : null}
        {showNotificationUpdate && isSuccessUpdate != null
          ? notification[isSuccessUpdate ? "success" : "error"]({
              message: isSuccessUpdate ? "Éxito" : "Error",
              description: isSuccessUpdate
                ? "Registro actualizado"
                : "Hubo un error al guardar, intente de nuevo",
              placement: isSuccessUpdate ? "topRight" : "bottomRight",
              duration: 2,
            })
          : null}
        <Row>
          <Col span={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                paddingTop: "40px",
                paddingLeft: "120px",
              }}
            >
              <Title level={5}>
                ¿Desea hacer busqueda con filtros de los productos?
              </Title>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                paddingTop: "10px",
                paddingLeft: "120px",
              }}
            >
              <Switch
                onChange={onChangeFilter}
                checkedChildren="Sí"
                unCheckedChildren="No"
              />
            </div>
            {showFilters ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  paddingTop: "20px",
                  paddingLeft: "120px",
                }}
              >
                <Select
                  defaultValue={categories[0]}
                  style={{ width: 120, marginRight: "15px" }}
                  onChange={handleCategoriesChange}
                >
                  {categories.map((item) => (
                    <Option key={item}>{item}</Option>
                  ))}
                </Select>
                <Select
                  style={{ width: 160 }}
                  value={secondSubCategory}
                  onChange={onSecondCategoryChange}
                >
                  {subCategoriesState.map((item) => (
                    <Option key={item}>{item}</Option>
                  ))}
                </Select>
              </div>
            ) : null}
          </Col>
          <Col span={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "120px",
                paddingTop: "50px",
              }}
            >
              <Button type="primary" onClick={openProductCreate}>
                <PlusOutlined /> Agregar producto
              </Button>
            </div>
          </Col>
        </Row>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "25px",
            paddingTop: "30px",
          }}
        >
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
            <ProductForm setisSuccess={setisSuccess} />
          </Drawer>
          <Drawer
            title="Actualizando registro"
            width={"50%"}
            onClose={onCloseProductUpdate}
            visible={visibleProductUpdate}
            bodyStyle={{ paddingBottom: 80 }}
          >
            <ProductUpdate
              id={currentProduct}
              setisSuccessUpdate={setisSuccessUpdate}
            />
          </Drawer>
        </div>
      </PrivateRoute>
    </>
  );
};

export default productos;
