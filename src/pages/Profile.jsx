import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TableEmployee from "../components/TableEmployee";
import {
  FaSearch,
  FaCamera,
  FaTrash,
  FaTimes,
  FaPlus,
  FaExclamationCircle,
} from "react-icons/fa";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isNotFoundVisible, setIsNotFoundVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState({
    id: null,
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    roleId: "",
  });
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    roleId: "",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5011/api/users");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error al obtener empleados:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
    setCreatePreviewImage(null);
    setNewEmployee({
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      roleId: "",
      imagen: null,
    });
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee({
      ...currentEmployee,
      [name]: value,
    });
  };

  const handleCreateInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    // Actualiza la estructura de employeeData
    const employeeData = {
      name: newEmployee.name,
      phoneNumber: newEmployee.phoneNumber,
      password: newEmployee.password,
      email: newEmployee.email,
      roleId: newEmployee.roleId,
    };

    try {
      const response = await fetch(
        "http://localhost:5011/api/users/userCreate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employeeData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear el empleado");
      }

      const createdEmployee = await response.json();

      setEmployees([...employees, createdEmployee]);
      setIsCreateModalOpen(false);

      console.log("Empleado creado:", createdEmployee);
    } catch (error) {
      console.error("Error al crear empleado:", error);
    }
  };

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const trimmedQuery = searchQuery.trim();

      if (trimmedQuery === "") return;

      try {
        const response = await fetch(
          `http://localhost:5011/api/users/search/${trimmedQuery}`
        );

        if (!response.ok) {
          throw new Error("Error al buscar el empleado");
        }

        const foundEmployee = await response.json();

        if (foundEmployee) {
          setCurrentEmployee(foundEmployee);
          setPreviewImage(foundEmployee.imagen);
          setIsNotFoundVisible(false);
        } else {
          setIsNotFoundVisible(true);
          setTimeout(() => {
            setIsNotFoundVisible(false);
          }, 3000);
        }
      } catch (error) {
        console.error("Error en la búsqueda:", error);
        setIsNotFoundVisible(true);
        setTimeout(() => {
          setIsNotFoundVisible(false);
        }, 3000);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-4xl mx-auto">
          {/* Barra de búsqueda */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Buscar empleado por nombre..."
              className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
          </div>
          <button
            className="bg-blue-200 text-blue-900 px-6 py-2 rounded-md hover:bg-blue-300 transition-colors flex items-center gap-2"
            onClick={handleOpenCreateModal}
          >
            <FaPlus size={14} />
            Crear
          </button>

          {/* Mensaje de empleado no encontrado */}
          {isNotFoundVisible && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded animate-fade-in">
              <div className="flex items-center">
                <FaExclamationCircle className="text-yellow-500 mr-2" />
                <p>No se encontró ningún empleado con ese nombre.</p>
              </div>
            </div>
          )}

          {/* Contenido principal */}
          <div className="flex flex-col md:flex-row gap-6">
            <TableEmployee employees={employees}></TableEmployee>
          </div>
        </div>

        {/* Modal de creación de empleado */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-lg w-full max-w-3xl p-6 shadow-2xl transform transition-all animate-pop-up">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h2 className="text-2xl font-bold text-blue-900">
                  Crear Nuevo Empleado
                </h2>
                <button
                  onClick={handleCloseCreateModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newEmployee.name}
                      onChange={handleCreateInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={newEmployee.phoneNumber}
                      onChange={handleCreateInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rol
                    </label>
                    <input
                      type="text"
                      name="roleId"
                      value={newEmployee.roleId}
                      onChange={handleCreateInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={newEmployee.email}
                      onChange={handleCreateInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={newEmployee.password}
                      onChange={handleCreateInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6 gap-3">
                  <button
                    type="button"
                    onClick={handleCloseCreateModal}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                  >
                    Crear empleado
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Agregar estilos CSS para las animaciones */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes popUp {
            0% {
              opacity: 0;
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          .animate-fade-in {
            animation: fadeIn 0.3s ease-out;
          }

          .animate-pop-up {
            animation: popUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
        `}</style>
        <div class="fixed bottom-0 w-full">
          <Footer></Footer>
        </div>
      </div>
    </>
  );
};

export default Profile;
