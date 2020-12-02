import React, { useState } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Switch,
  InputNumber,
} from "antd";
import { useFetch } from "../../../commons/useFetch";
import { getJWT } from "../../../commons/getJWT";
import axios from "axios";

const ProductForm = () => {
  const onFinish = async (values) => {
    await getSubAndCategory();
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
    const jwt = getJWT();
    const headers = {
      Authorization: `Bearer ${jwt}`,
    };
    try {
      const response = await axios.post(URL, values, { headers });
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Form layout="vertical" hideRequiredMark onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="Name"
            label="Nombre"
            rules={[{ required: true, message: "Porfavor ingrese un nombre" }]}
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
            <Input placeholder="Peso del producto" />
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
  );
};

export default ProductForm;
