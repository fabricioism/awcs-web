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
import {
  categories,
  subCategories,
  categoriesIds,
} from "../../../commons/categories";
import { getJWT } from "../../../commons/getJWT";
import axios from "axios";

const ProductUpdate = ({ id }) => {
  const [form] = Form.useForm();

  const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`;
  const bearer = getJWT();
  const headers = {
    Authorization: `Bearer ${bearer}`,
  };

  const [subCategoriesState, setsubCategoriesState] = useState(
    subCategories[categories[0]]
  );
  const [secondSubCategory, setsecondSubCategory] = useState(
    subCategories[categories[0]][0]
  );

  const [productData, setproductData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(ENDPOINT, { headers });
        const json = await response.json();
        setproductData(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    getData();
  }, [ENDPOINT]);

  useEffect(() => {
    form.resetFields();
    console.log("Hola");
  }, [productData, form]);

  const getSubCategoryId = (value) => {
    return categoriesIds[value];
  };

  const handleCategoriesChange = (value) => {
    setsubCategoriesState(subCategories[value]);
    setsecondSubCategory(subCategories[value][0]);
  };

  const onSecondCategoryChange = (value) => {
    setsecondSubCategory(value);
  };

  const onFinish = async (values) => {
    values["product_subcategory"] = getSubCategoryId(secondSubCategory);
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`;
    const jwt = getJWT();
    const header = {
      Authorization: `Bearer ${jwt}`,
    };
    try {
      const { status } = await axios.put(URL, values, { headers: header });
      setisSuccess(status === 200 ? true : false);
      setshowNotification(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        initialValues={productData}
        hideRequiredMark
        onFinish={onFinish}
      >
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
            <Form.Item
              valuePropName="checked"
              name="MakeFlag"
              label="¿Es manufacturado por AWC?"
            >
              <Switch checkedChildren="Sí" unCheckedChildren="No" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              valuePropName="checked"
              name="FinishedGoodsFlag"
              label="¿Es vendible?"
            >
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
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="Weight" label="Peso">
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="DaysToManufacture"
              label="Días requeridos para manufacturarlo"
            >
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="SafetyStockLevel"
              label="Cantidad mínima de inventario"
            >
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ReorderPoint" label="Punto de pedido">
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="StandardCost" label="Costo estándard">
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ListPrice" label="Costo de venta">
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="product_subcategory"
              label="Seleccione la subcategoria"
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
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
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

export default ProductUpdate;