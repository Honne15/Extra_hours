import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Modal, Button, Form, Input, Upload, Avatar, Popconfirm, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const Profile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]); 

  const showCreateModal = () => {
    setSelectedEmployee(null);
    form.resetFields();
    setFileList([]); 
    setIsModalVisible(true);
  };

  const isDuplicate = (email, phone, id) => {
    return employees.some(
      (emp) => (emp.email === email && emp.id !== id) || (emp.phone === phone && emp.id !== id)
    );
  };

  const handleOk = async (values) => {
    if (isDuplicate(values.email, values.phone, selectedEmployee?.id)) {
      message.error("Ya existe un empleado con el mismo correo o teléfono.");
      return;
    }

    const photoUrl = fileList.length > 0 ? fileList[0]?.thumbUrl : selectedEmployee?.photo || null;

    if (selectedEmployee) {
      const updatedEmployees = employees.map((emp) =>
        emp.id === selectedEmployee.id ? { ...emp, ...values, photo: photoUrl || emp.photo } : emp
      );
      setEmployees(updatedEmployees.sort((a, b) => a.name.localeCompare(b.name)));
    } else {
      const newEmployee = {
        ...values,
        id: Math.random().toString(36).substr(2, 9),
        photo: photoUrl,
      };
      setEmployees([...employees, newEmployee].sort((a, b) => a.name.localeCompare(b.name)));
    }

    setIsModalVisible(false);
    form.resetFields();
    setFileList([]); 
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    form.setFieldsValue(employee);
    setFileList(employee.photo ? [{ thumbUrl: employee.photo }] : []); 
    setIsModalVisible(true);
  };

  const handleDelete = (employeeId) => {
    setEmployees(employees.filter((employee) => employee.id !== employeeId));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />

      <div className="container">
        <div className="search-section" style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
          <Input.Search placeholder="Buscar empleado..." onChange={handleSearch} style={{ width: 300, marginRight: 10 }} />
          <Button type="primary" onClick={showCreateModal}>Crear</Button>
        </div>

        <div className="employee-list" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {filteredEmployees.map((employee) => (
            <div key={employee.id} style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", textAlign: "center" }}>
              <Avatar src={employee.photo || "/default-avatar.png"} size={120} shape="circle" style={{ objectFit: "cover", marginBottom: "20px" }} />
              
              <div style={{ width: "100%" }}>
                <div style={{ borderBottom: "1px solid #e0e0e0", padding: "10px 0" }}>
                  <strong style={{ display: "block", marginBottom: "5px" }}>Nombre:</strong> 
                  {employee.name}
                </div>

                <div style={{ borderBottom: "1px solid #e0e0e0", padding: "10px 0" }}>
                  <strong style={{ display: "block", marginBottom: "5px" }}>Área:</strong>
                  {employee.area}
                </div>

                <div style={{ borderBottom: "1px solid #e0e0e0", padding: "10px 0" }}>
                  <strong style={{ display: "block", marginBottom: "5px" }}>Email:</strong>
                  {employee.email}
                </div>

                <div style={{ borderBottom: "1px solid #e0e0e0", padding: "10px 0" }}>
                  <strong style={{ display: "block", marginBottom: "5px" }}>Teléfono:</strong>
                  {employee.phone}
                </div>

                <div style={{ padding: "10px 0" }}>
                  <strong style={{ display: "block", marginBottom: "5px" }}>Código:</strong>
                  {employee.code || "No disponible"}
                </div>
              </div>

              <div style={{ marginTop: "20px", width: "100%" }}>
                <Button type="primary" onClick={() => handleEdit(employee)} style={{ marginRight: "10px", width: "100px" }}>
                  Editar
                </Button>
                <Popconfirm title="¿Estás seguro de eliminar este empleado?" onConfirm={() => handleDelete(employee.id)} okText="Sí" cancelText="No">
                  <Button danger style={{ width: "100px" }}>Eliminar</Button>
                </Popconfirm>
              </div>
            </div>
          ))}
        </div>

        <Modal title={selectedEmployee ? "Editar Empleado" : "Crear Empleado"} visible={isModalVisible} onCancel={handleCancel} footer={null}>
          <Form form={form} onFinish={handleOk} initialValues={selectedEmployee || {}}>
            <Form.Item label="Nombre" name="name" rules={[{ required: true, message: "Por favor ingrese el nombre" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Área" name="area" rules={[{ required: true, message: "Por favor ingrese el área" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Por favor ingrese el email" }, { type: "email", message: "Por favor ingrese un email válido" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Teléfono" name="phone" rules={[{ required: true, message: "Por favor ingrese el teléfono" }, { pattern: /^[0-9]{10}$/, message: "Por favor ingrese un teléfono válido de 10 dígitos" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Foto" name="photo">
              <Upload listType="picture" fileList={fileList} beforeUpload={() => false} onChange={({ fileList }) => setFileList(fileList)}>
                <Button icon={<UploadOutlined />}>Seleccionar Foto</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">{selectedEmployee ? "Guardar Cambios" : "Crear"}</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
