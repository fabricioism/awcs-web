import React from "react";
import { useFetch } from "../../../commons/useFetch";
import { Col, Divider, Row } from "antd";
import styles from "./productDetail.module.css";

const ProductDetail = ({ id }) => {
  const { response, isLoading } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
    {
      method: "GET",
    },
    true,
    [id]
  );

  const DescriptionItem = ({ title, content }) => (
    <div className={styles.siteDescriptionItemProfileWrapper}>
      <p className={styles.siteDescriptionItemProfilePLabel}>{title}:</p>
      {content}
    </div>
  );

  return (
    <>
      <p
        style={{ fontWeight: "bold" }}
        className={styles.siteDescriptionItemProfileP}
      >
        Datos generales
      </p>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="Nombre"
            content={!isLoading ? `${response?.Name}` : ""}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Número de Producto"
            content={`${response?.ProductNumber}`}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="¿Es manufacturado por Adventure Works?"
            content={`${response?.MakeFlag ? "Sí" : "No"}`}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="¿Es vendible?"
            content={`${response?.FinishedGoodsFlag ? "Sí" : "No"}`}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="Color"
            content={`${response?.Color ? response?.Color : "N/A"}`}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Tamaño"
            content={`${response?.Size ? response?.Size : "N/A"}`}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="Peso"
            content={`${response?.Weight ? response?.Weight : "N/A"}`}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Días para manufacturarlo"
            content={`${
              response?.DaysToManufacture ? response?.DaysToManufacture : "N/A"
            }`}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="Stock de seguridad"
            content={`${response?.SafetyStockLevel}`}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Punto de pedido"
            content={`${response?.ReorderPoint}`}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="Costo estándard"
            content={`${
              response?.StandardCost ? response?.StandardCost : "N/A"
            }`}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Costo de venta"
            content={`${response?.ListPrice ? response?.ListPrice : "N/A"}`}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Subcategoria"
            content={`${
              response?.product_subcategory
                ? response?.product_subcategory.Name
                : "N/A"
            }`}
          />
        </Col>
      </Row>
      <Divider />
    </>
  );
};

export default ProductDetail;
