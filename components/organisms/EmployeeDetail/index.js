import React from "react";
import { useFetch } from "../../../commons/useFetch";
import { Col, Divider, Row } from "antd";
import styles from "./employeeDetail.module.css";

const EmployeeDetail = ({ id }) => {
  console.log("id desde detail", id);

  const { response, isLoading } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/employees/${id}`,
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
        Datos Personales
      </p>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="Nombre completo"
            content={
              !isLoading
                ? `${response?.person?.FirstName}  ${
                    response?.person?.MiddleName
                      ? response?.person?.MiddleName
                      : ""
                  } ${response?.person?.LastName}`
                : ""
            }
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="ID"
            content={`${response?.NationalIDNumber}`}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Género" content={`${response?.Gender}`} />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Fecha de nacimiento"
            content={`${response?.BirthDate}`}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DescriptionItem
            title="Estado civil"
            content={`${response?.MaritalStatus}`}
          />
        </Col>
      </Row>
      <Divider />
      <p
        style={{ fontWeight: "bold" }}
        className={styles.siteDescriptionItemProfileP}
      >
        Datos Laborales
      </p>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="Cargo que desempeña"
            content={`${response?.JobTitle}`}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Contratación"
            content={`${response?.HireDate}`}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="Horas de vacaciones"
            content={`${response?.VacationHours}`}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Horas de licencia por enfermedad"
            content={`${response?.SickLeaveHours}`}
          />
        </Col>
      </Row>
    </>
  );
};

export default EmployeeDetail;
