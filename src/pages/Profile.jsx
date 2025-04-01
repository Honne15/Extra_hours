import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaSearch, FaCamera } from 'react-icons/fa';

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employee, setEmployee] = useState({
    nombre: '',
    area: '',
    codigo: '',
    email: '',
    telefono: '',
    imagen: null
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
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
      setEmployee({
        ...employee,
        imagen: file
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí implementarías la lógica para guardar los cambios
    console.log("Empleado actualizado:", employee);
    setIsModalOpen(false);
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
            placeholder="Buscar empleado..."
            className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
        </div>
        
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
                <p className="border-b border-gray-300 pb-1">{employee.nombre || '—————'}</p>
              </div>
              <div>
                <p className="text-blue-900 font-medium">Teléfono</p>
                <p className="border-b border-gray-300 pb-1">{employee.telefono || '—————'}</p>
              </div>
              <div>
                <p className="text-blue-900 font-medium">Área</p>
                <p className="border-b border-gray-300 pb-1">{employee.area || '—————'}</p>
              </div>
              <div>
                <p className="text-blue-900 font-medium">Email</p>
                <p className="border-b border-gray-300 pb-1">{employee.email || '—————'}</p>
              </div>
              <div>
                <p className="text-blue-900 font-medium">Código</p>
                <p className="border-b border-gray-300 pb-1">{employee.codigo || '—————'}</p>
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="flex justify-center mt-6 gap-4">
              <button className="bg-blue-200 text-blue-900 px-6 py-2 rounded-md hover:bg-blue-300 transition-colors">
                Crear
              </button>
              <button 
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
                onClick={handleOpenModal}
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de edición */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-900">Editar Perfil</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500">
                    <img 
                      src={previewImage || "https://via.placeholder.com/150"} 
                      alt="Foto de perfil" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer">
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
                    value={employee.nombre}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="text"
                    name="telefono"
                    value={employee.telefono}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Área</label>
                  <input
                    type="text"
                    name="area"
                    value={employee.area}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={employee.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
                  <input
                    type="text"
                    name="codigo"
                    value={employee.codigo}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <Footer />
    </div>
    </>
  );
};

export default Profile;
