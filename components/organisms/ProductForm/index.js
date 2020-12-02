import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  notification,
  Switch,
  InputNumber,
} from "antd";
import { useFetch } from "../../../commons/useFetch";
import { Notification } from "../../atoms";
import { categories, subCategories } from "../../../commons/categories";
import { getJWT } from "../../../commons/getJWT";
import axios from "axios";

const ProductForm = () => {
  const [showNotification, setshowNotification] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [subCategoriesState, setsubCategoriesState] = useState(
    subCategories[categories[0]]
  );
  const [secondSubCategory, setsecondSubCategory] = useState(
    subCategories[categories[0]][0]
  );

  const handleCategoriesChange = (value) => {
    setsubCategoriesState(subCategories[value]);
    setsecondSubCategory(subCategories[value][0]);
  };

  const onSecondCategoryChange = (value) => {
    setsecondSubCategory(value);
    console.log("value", value);
  };

  const onFinish = async (values) => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
    const jwt = getJWT();
    const headers = {
      Authorization: `Bearer ${jwt}`,
    };
    try {
      const { status } = await axios.post(URL, values, { headers });
      setisSuccess(status === 200 ? true : false);
      setshowNotification(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <>
        <Select
          defaultValue={categories[0]}
          style={{ width: 120 }}
          onChange={handleCategoriesChange}
        >
          {categories.map((item) => (
            <Option key={item}>{item}</Option>
          ))}
        </Select>
        <Select
          style={{ width: 120 }}
          value={secondSubCategory}
          onChange={onSecondCategoryChange}
        >
          {subCategoriesState.map((item) => (
            <Option key={item}>{item}</Option>
          ))}
        </Select>
      </>
      {showNotification
        ? notification[isSuccess ? "success" : "error"]({
            message: isSuccess ? "Éxito" : "Error",
            description: isSuccess
              ? "Registro guardado"
              : "Hubo un error al guardar, intente de nuevo",
          })
        : null}
      <Form layout="vertical" hideRequiredMark onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="Name"
              label="Nombre"
              rules={[
                { required: true, message: "Porfavor ingrese un nombre" },
              ]}
            >
              <Input placeholder="Nombre del producto" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="ProductNumber"
              label="Número de producto"
              rules={[
                {
                  required: true,
                  message: "Porfavor ingrese un número de producto",
                },
              ]}
            >
              <Input placeholder="Número del producto" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="MakeFlag" label="¿Es manufacturado por AWC?">
              <Switch checkedChildren="Sí" unCheckedChildren="No" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="FinishedGoodsFlag" label="¿Es vendible?">
              <Switch checkedChildren="Sí" unCheckedChildren="No" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="Color" label="Color">
              <Input placeholder="Color del producto" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="Size" label="Tamaño">
              <Input placeholder="Tamaño del producto" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="Weight" label="Peso">
              <InputNumber
                min={0}
                defaultValue={0}
                placeholder="Peso del producto"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="DaysToManufacture"
              label="Días requeridos para manufacturarlo"
            >
              <InputNumber
                min={0}
                defaultValue={0}
                placeholder="Días de manufacturación"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="SafetyStockLevel"
              label="Cantidad mínima de inventario"
            >
              <InputNumber
                min={0}
                defaultValue={0}
                placeholder="Cantidad mínima de inventario"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ReorderPoint" label="Punto de pedido">
              <InputNumber
                min={0}
                defaultValue={0}
                placeholder="Punto de pedido"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="StandardCost" label="Costo estándard">
              <InputNumber
                min={0}
                defaultValue={0}
                placeholder="Costo estándar"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ListPrice" label="Costo de venta">
              <InputNumber
                min={0}
                defaultValue={0}
                placeholder="Costo de venta"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Guardar datos
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ProductForm;
