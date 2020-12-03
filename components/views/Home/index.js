import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Typography, Row, Col, Image, Button } from "antd";
import styles from "./Home.module.css";
const { Title } = Typography;

const Home = () => {
  return (
    <>
      <Head>
        <title>Inicio | Adventure Works Cycle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <Title level={2} className={styles.title}>
            ¡Bienvenido! <br />
            Panel de administración
          </Title>
        </div>
        <Row gutter={[24, 24]} className={styles.rowCol}>
          <Col span={12}>
            <div>
              <Image
                width={200}
                height={200}
                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/bicicleta_e06b5a6668.svg`}
                alt={"Productos"}
                preview={false}
              />
              <Title level={4} strong={true} className={styles.subTitle}>
                Gestión de productos
              </Title>
              <Link href="/productos">
                <a>
                  <Button type="primary" style={{ width: "150px" }}>
                    Ir
                  </Button>
                </a>
              </Link>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <Image
                width={200}
                height={180}
                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/humano_3801190ba1.svg`}
                preview={false}
                alt={"Recursos humanos"}
              />
              <Title
                level={4}
                strong={true}
                className={styles.subTitle}
                style={{ paddingBottom: "0px ", paddingTop: "15px" }}
              >
                Gestión de recursos humanos
              </Title>
              <Link href="/rrhh">
                <a>
                  <Button type="primary" style={{ width: "150px" }}>
                    Ir
                  </Button>
                </a>
              </Link>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
};

export default Home;
