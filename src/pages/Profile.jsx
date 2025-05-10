import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaSearch, FaCamera, FaTrash, FaTimes, FaPen, FaPlus, FaExclamationCircle } from 'react-icons/fa';

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isNotFoundVisible, setIsNotFoundVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState({
    id: null,
    nombre: '',
    area: '',
    codigo: '',
    email: '',
    telefono: '',
    imagen: null
  });
  const [newEmployee, setNewEmployee] = useState({
    nombre: '',
    area: '',
    codigo: '',
    email: '',
    telefono: '',
    imagen: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [createPreviewImage, setCreatePreviewImage] = useState(null);

  // Cargar empleados del localStorage al iniciar
  useEffect(() => {
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    }
  }, []);

  // Guardar empleados en localStorage cuando cambia el array
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
    setCreatePreviewImage(null);
    setNewEmployee({
      nombre: '',
      area: '',
      codigo: '',
      email: '',
      telefono: '',
      imagen: null
    });
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee({
      ...currentEmployee,
      [name]: value
    });
  };

  const handleCreateInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setCurrentEmployee({
        ...currentEmployee,
        imagen: file
      });
    }
  };

  const handleCreateImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCreatePreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setNewEmployee({
        ...newEmployee,
        imagen: file
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Crear un objeto para almacenar los datos actualizados
    const updatedEmployee = {
      ...currentEmployee,
      imagen: previewImage // Guardar la URL de la imagen
    };
    
    // Actualizar el empleado en el array
    const updatedEmployees = employees.map(emp => 
      emp.id === currentEmployee.id ? updatedEmployee : emp
    );
    
    // Actualizar el estado
    setEmployees(updatedEmployees);
    setCurrentEmployee(updatedEmployee);
    setIsModalOpen(false);
    
    console.log("Empleado actualizado:", updatedEmployee);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    
    // Crear un nuevo empleado con ID único
    const newEmployeeWithId = {
      ...newEmployee,
      id: Date.now().toString(),
      imagen: createPreviewImage // Guardar la URL de la imagen
    };
    
    // Agregar el nuevo empleado al array
    const updatedEmployees = [...employees, newEmployeeWithId];
    
    // Actualizar el estado
    setEmployees(updatedEmployees);
    setCurrentEmployee(newEmployeeWithId);
    setPreviewImage(createPreviewImage);
    setIsCreateModalOpen(false);
    
    console.log("Nuevo empleado creado:", newEmployeeWithId);
  };

  const handleDelete = () => {
    // Filtrar el array para eliminar el empleado actual
    const updatedEmployees = employees.filter(emp => emp.id !== currentEmployee.id);
    
    // Actualizar el estado
    setEmployees(updatedEmployees);
    setCurrentEmployee({
      id: null,
      nombre: '',
      area: '',
      codigo: '',
      email: '',
      telefono: '',
      imagen: null
    });
    setPreviewImage(null);
    setIsDeleteModalOpen(false);
    
    console.log("Empleado eliminado:", currentEmployee);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmedQuery = searchQuery.trim().toLowerCase();
      
      if (trimmedQuery === '') return;
      
      // Buscar el empleado por nombre
      const foundEmployee = employees.find(emp => 
        emp.nombre.toLowerCase().includes(trimmedQuery)
      );
      
      if (foundEmployee) {
        setCurrentEmployee(foundEmployee);
        setPreviewImage(foundEmployee.imagen);
        setIsNotFoundVisible(false);
      } else {
        // Mostrar mensaje de "no encontrado"
        setIsNotFoundVisible(true);
        setTimeout(() => {
          setIsNotFoundVisible(false);
        }, 3000); // Ocultar después de 3 segundos
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
          {/* Imagen del perfil */}
          <div className="flex-shrink-0">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-900 relative mx-auto">
              <img 
                src={previewImage || "https://via.placeholder.com/150"} 
                alt="Foto de perfil" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Información del empleado */}
          <div className="flex-grow bg-blue-50 rounded-lg p-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <p className="text-blue-900 font-medium">Nombre</p>
                <p className="border-b border-gray-300 pb-1">{currentEmployee.nombre || '—————'}</p>
              </div>
              <div>
                <p className="text-blue-900 font-medium">Teléfono</p>
                <p className="border-b border-gray-300 pb-1">{currentEmployee.telefono || '—————'}</p>
              </div>
              <div>
                <p className="text-blue-900 font-medium">Área</p>
                <p className="border-b border-gray-300 pb-1">{currentEmployee.area || '—————'}</p>
              </div>
              <div>
                <p className="text-blue-900 font-medium">Email</p>
                <p className="border-b border-gray-300 pb-1">{currentEmployee.email || '—————'}</p>
              </div>
              <div>
                <p className="text-blue-900 font-medium">Código</p>
                <p className="border-b border-gray-300 pb-1">{currentEmployee.codigo || '—————'}</p>
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="flex justify-center mt-6 gap-4">
              <button 
                className="bg-blue-200 text-blue-900 px-6 py-2 rounded-md hover:bg-blue-300 transition-colors flex items-center gap-2"
                onClick={handleOpenCreateModal}
              >
                <FaPlus size={14} />
                Crear
              </button>
              <button 
                className={`bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors flex items-center gap-2 ${!currentEmployee.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleOpenModal}
                disabled={!currentEmployee.id}
              >
                <FaPen size={14} />
                Editar
              </button>
              <button 
                className={`bg-red-200 text-red-900 px-6 py-2 rounded-md hover:bg-red-300 transition-colors flex items-center gap-2 ${!currentEmployee.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleOpenDeleteModal}
                disabled={!currentEmployee.id}
              >
                <FaTrash size={14} />
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de edición mejorado como ventana emergente */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-lg w-full max-w-3xl p-6 shadow-2xl transform transition-all animate-pop-up">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-2xl font-bold text-blue-900">Editar Perfil</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500 shadow-md">
                    <img 
                      src={previewImage || "https://via.placeholder.com/150"} 
                      alt="Foto de perfil" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-600 transition-colors">
                    <FaCamera />
                    <input 
                      type="file" 
                      id="profile-image" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={currentEmployee.nombre}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="text"
                    name="telefono"
                    value={currentEmployee.telefono}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Área</label>
                  <input
                    type="text"
                    name="area"
                    value={currentEmployee.area}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={currentEmployee.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
                  <input
                    type="text"
                    name="codigo"
                    value={currentEmployee.codigo}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-6 gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de creación de empleado */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-lg w-full max-w-3xl p-6 shadow-2xl transform transition-all animate-pop-up">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-2xl font-bold text-blue-900">Crear Nuevo Empleado</h2>
              <button
                onClick={handleCloseCreateModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateSubmit}>
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500 shadow-md">
                    <img 
                      src={createPreviewImage || "https://via.placeholder.com/150"} 
                      alt="Foto de perfil" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label htmlFor="create-profile-image" className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-600 transition-colors">
                    <FaCamera />
                    <input 
                      type="file" 
                      id="create-profile-image" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleCreateImageChange}
                    />
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={newEmployee.nombre}
                    onChange={handleCreateInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="text"
                    name="telefono"
                    value={newEmployee.telefono}
                    onChange={handleCreateInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Área</label>
                  <input
                    type="text"
                    name="area"
                    value={newEmployee.area}
                    onChange={handleCreateInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
                  <input
                    type="text"
                    name="codigo"
                    value={newEmployee.codigo}
                    onChange={handleCreateInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
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

      {/* Modal de confirmación de eliminación mejorado como ventana emergente */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0  flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-2xl transform transition-all animate-pop-up">
            <div className="flex justify-end">
              <button
                onClick={handleCloseDeleteModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes size={16} />
              </button>
            </div>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-red-100 mb-4">
                <FaTrash className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Eliminar empleado</h3>
              <p className="text-sm text-gray-600 mb-6">
                ¿Está seguro que desea eliminar a {currentEmployee.nombre || "este empleado"}? Esta acción no se puede deshacer.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={handleCloseDeleteModal}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Sí, eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Agregar estilos CSS para las animaciones */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
      `}</style>
      <Footer />
    </div>
    </>
  );
};

export default Profile;

//...