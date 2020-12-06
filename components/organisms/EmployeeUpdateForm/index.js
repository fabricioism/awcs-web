import React, { useCallback, useState, useEffect } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  Spin,
  DatePicker,
  Switch,
  InputNumber,
  Typography,
  Divider,
} from "antd";
import debounce from "lodash/debounce";
import { getJWT } from "../../../commons/getJWT";
import moment from "moment";
import axios from "axios";

const { Title } = Typography;
const { Option } = Select;

const EmployeeUpdateForm = ({ id, setisSuccessUpdate }) => {
  const [form] = Form.useForm();

  const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/employees/${id}`;
  const bearer = getJWT();
  const headers = {
    Authorization: `Bearer ${bearer}`,
  };

  const [employeeData, setemployeeData] = useState(null);
  const [currentDepartment, setcurrentDepartment] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(ENDPOINT, { headers });
        const json = await response.json();
        setemployeeData(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    getData();
  }, [ENDPOINT]);

  useEffect(() => {
    const getDepartment = async () => {
      try {
        let {
          department: currentDepartmentId,
        } = employeeData?.employeedepartmenthistories
          ? employeeData?.employeedepartmenthistories?.pop()
          : {};

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/departments/${currentDepartmentId}`
        );
        const json = await res.json();
        setcurrentDepartment({ id: json.DepartmentID, Name: json.Name });
      } catch (error) {
        console.log("error", error);
      }
    };
    getDepartment();
  }, [employeeData]);

  useEffect(() => {
    form.resetFields();
  }, [employeeData, form]);

  /** Variables de estado para el departamento */
  const [departmentQuery, setdepartmentQuery] = useState("");
  const [departments, setdepartments] = useState([]);
  const [fetching, setfetching] = useState(false);

  const onFinish = async (values) => {
    values["BirthDate"] = values.BirthDate.format("YYYY-MM-DD");
    values["HireDate"] = values.HireDate.format("YYYY-MM-DD");

    const URL = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`;
    const jwt = getJWT();
    const header = {
      Authorization: `Bearer ${jwt}`,
    };

    try {
      await axios.put(URL, values, { headers: header });
      setisSuccessUpdate(true);
    } catch (error) {
      setisSuccessUpdate(false);
    }
  };

  /** FETCH DE DEPARTAMENTO */
  const fetchItem = (value) => {
    setdepartments([]);
    setfetching(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/departments?Name_contains=${value}&_limit=3`
    )
      .then((response) => response.json())
      .then((body) => {
        const data = body.map((item) => ({
          text: item["Name"],
          value: item["id"],
        }));
        setdepartments(data);
        setfetching(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const delayedQuery = useCallback(debounce(fetchItem, 800), [departmentQuery]);

  const handleChangeDepartment = (value) => {
    setdepartmentQuery(value);
    setdepartments([]);
    setfetching(false);
  };

  useEffect(() => {
    delayedQuery();
    return () => {
      delayedQuery.cancel;
    };
  }, [departmentQuery, delayedQuery]);

  const dateFormat = "YYYY-MM-DD";
  return (
    <>
      <Form
        form={form}
        initialValues={{
          FirstName: employeeData?.person.FirstName,
          MiddleName: employeeData?.person.MiddleName
            ? employeeData?.person.MiddleName
            : "N/A",
          LastName: employeeData?.person.LastName,
          NationalIDNumber: employeeData?.NationalIDNumber,
          Gender: employeeData?.Gender,
          Email: employeeData?.person.Email
            ? employeeData?.person.Email
            : "N/A",
          PhoneNumber: employeeData?.person.PhoneNumber
            ? employeeData?.person.PhoneNumber
            : "N/A",
          MaritalStatus: employeeData?.MaritalStatus,
          JobTitle: employeeData?.JobTitle,
          SalariedFlag: employeeData?.SalariedFlag,
          CurrentFlag: employeeData?.CurrentFlag,
          SickLeaveHours: employeeData?.SickLeaveHours,
          VacationHours: employeeData?.VacationHours,
        }}
        layout="vertical"
        hideRequiredMark
        onFinish={onFinish}
      >
        <Title level={5}>Datos personales</Title>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="FirstName"
              label="Nombre"
              rules={[
                { required: true, message: "Porfavor ingrese un nombre" },
              ]}
            >
              <Input placeholder="Nombre de la persona" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="MiddleName"
              label="Segundo nombre"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input placeholder="Segundo nombre de la persona" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="LastName"
              label="Apellido"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese un apellido",
                },
              ]}
            >
              <Input placeholder="Apellido de la persona" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="NationalIDNumber"
              label="ID"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese la identidad de la persona",
                },
              ]}
            >
              <Input placeholder="Número de identidad" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="BirthDate"
              label="Fecha de nacimiento"
              rules={[
                {
                  required: true,
                  message:
                    "Por favor ingrese la fecha de nacimiento de la persona",
                },
              ]}
            >
              <DatePicker
                defaultValue={moment(employeeData?.BirthDate, dateFormat)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="Gender"
              label="Género"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione un género",
                },
              ]}
            >
              <Select style={{ width: 150 }}>
                <Option value="F">Femenino</Option>
                <Option value="M">Masculino</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="Email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "Ingrese un email válido",
                  required: true,
                },
              ]}
            >
              <Input placeholder="E-mail de la persona" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="PhoneNumber"
              label="Número telefónico"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese un número telefónico",
                },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                placeholder="Número de teléfono de la persona"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="MaritalStatus"
              label="Estado civil"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione un estado civil",
                },
              ]}
            >
              <Select style={{ width: 150 }}>
                <Option value="M">Casado(a)</Option>
                <Option value="D">Divorciado(a)</Option>
                <Option value="W">Enviudado(a)</Option>
                <Option value="S">Soltero(a)</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Title level={5}>Datos del empleo</Title>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="JobTitle"
              label="Nombre del puesto"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el puesto de la persona",
                },
              ]}
            >
              <Input placeholder="Puesto que se le asignará" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="depto"
              label="Departamento de asignación"
              rules={[
                {
                  required: true,
                  message:
                    "Por favor seleccione el Depto. donde se asignará a la persona",
                },
              ]}
            >
              <Select
                labelInValue
                defaultValue={currentDepartment.id}
                value={departmentQuery}
                placeholder="Seleccione"
                notFoundContent={fetching ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={fetchItem}
                onChange={handleChangeDepartment}
                style={{ width: "100%" }}
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                optionFilterProp="children"
                searchValue={currentDepartment.Name}
              >
                {departments?.map((d) => (
                  <Option key={d?.value}>{d?.text}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              valuePropName="checked"
              name="SalariedFlag"
              label="¿Es empleado de tiempo completo?"
            >
              <Switch checkedChildren="Sí" unCheckedChildren="No" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              valuePropName="checked"
              name="CurrentFlag"
              label="¿Es un empleado activo?"
            >
              <Switch
                defaultChecked
                checkedChildren="Sí"
                unCheckedChildren="No"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="SickLeaveHours"
              label="Horas libres por enfermedad"
              rules={[
                {
                  required: true,
                  message:
                    "Por favor ingrese el número de horas librs por enfermedad",
                },
              ]}
            >
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="VacationHours"
              label="Horas de vacaciones"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el número de horas de vacaciones",
                },
              ]}
            >
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="HireDate"
              label="Fecha de contratación"
              rules={[
                {
                  required: true,
                  message:
                    "Por favor ingrese la fecha de contratación de la persona",
                },
              ]}
            >
              <DatePicker
                defaultValue={moment(employeeData?.HireDate, dateFormat)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          style={{
            padding: "15px 0px 0px 0px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button type="primary" htmlType="submit">
            Guardar datos
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default EmployeeUpdateForm;
