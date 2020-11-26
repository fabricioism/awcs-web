import React from "react";
import { useFetch } from "../../../commons/useFetch";
import { Col, Divider, Row } from "antd";
import styles from "./productDetail.module.css";

const ProductDetail = ({ id }) => {
  console.log("id desde detail", id);

  const { response, isLoading } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
    {
      method: "GET",
    }
  );

  const DescriptionItem = ({ title, content }) => (
    <div className={styles.siteDescriptionItemProfileWrapper}>
      <p className={styles.siteDescriptionItemProfilePLabel}>{title}:</p>
      {content}
    </div>
  );

  return (
    <>
      {/* <p
        className={styles.siteDescriptionItemProfileP}
        style={{ marginBottom: 24 }}
      >
        Perfil del empleado
      </p> */}
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
      <Divider />
    </>
  );
};

export default ProductDetail;
