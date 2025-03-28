import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Inicio", href: "/dashboard" },
  { name: "Horas extras", href: "/extrahours" },
  { name: "Salir", href: "/login" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="min-h-full">
        <main className="p-0">
          {/* Sección con Imagen de Fondo */}
          <div
            className="relative bg-cover bg-center h-64"
            style={{ backgroundImage: "url(/fondo-header.jpg)" }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Logo en la esquina superior izquierda */}
            <div className="absolute top-4 left-4 z-20">
              <img
                src="/logo-amadeus.png"
                alt="Logo Amadeus"
                className="h-12"
              />
            </div>

            {/* Menú desplegable */}
            <div className="absolute top-3 right-5 z-20">
              <button
                onClick={toggleMenu}
                className="rounded-full border border-gray-300 shadow-sm p-2 bg-white text-black hover:bg-gray-50"
              >
                {isOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-7 w-7" />
                )}
              </button>
            </div>

            {isOpen && (
              <div className="absolute top-16 right-4 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "bg-[#005eb8] text-white"
                          : "hover:bg-blue-200",
                        "block rounded-md px-3 py-2 text-lg font-medium text-gray-700"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            )}

            {/* Texto central sobre la imagen de fondo */}
            <div className="relative z-10 text-center text-white px-4 pt-16">
              <h1 className="text-4xl font-bold mb-4">Bienvenido a Amadeus</h1>
              <p className="text-lg">
                La solución integral para la gestión eficiente de horas extras
                de su equipo laboral.
              </p>
            </div>
          </div>

          {/* Sección de Servicios */}
          <div className="container mx-auto px-4 mt-12">
            <h2 className="text-center text-2xl font-bold mb-4 text-blue-800 bg-blue-50 p-4 rounded-lg shadow-md">
              Nuestros servicios:
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {/* Servicio 1: Registro de Horas */}
              <div className="bg-white rounded-lg shadow-lg p-4 text-center transform hover:scale-105 transition-transform duration-300">
                <div className="rounded-lg overflow-hidden mb-4">
                  <img
                    src="/registro-horas-icon.jpg"
                    alt="Registro de Horas"
                    className="w-full h-32 object-cover"
                  />
                </div>
                <h3 className="font-bold mb-2 text-blue-800">
                  Registro de Horas
                </h3>
                <p className="text-gray-600 text-sm">
                  Los empleados registran sus horas extras de manera sencilla a
                  través de un chatbot.
                </p>
              </div>

              {/* Servicio 2: Cálculo Automático */}
              <div className="bg-white rounded-lg shadow-lg p-4 text-center transform hover:scale-105 transition-transform duration-300">
                <div className="rounded-lg overflow-hidden mb-4">
                  <img
                    src="/calculo-automatico-icon.jpg"
                    alt="Cálculo Automático"
                    className="w-full h-32 object-cover"
                  />
                </div>
                <h3 className="font-bold mb-2 text-blue-800">
                  Cálculo Automático
                </h3>
                <p className="text-gray-600 text-sm">
                  Puede aprobar, archivar y/o editar las solicitudes de las
                  horas extras de los empleados.
                </p>
              </div>

              {/* Servicio 3: Información de Empleados */}
              <div className="bg-white rounded-lg shadow-lg p-4 text-center transform hover:scale-105 transition-transform duration-300">
                <div className="rounded-lg overflow-hidden mb-4">
                  <img
                    src="/informacion-empleados-icon.jpg"
                    alt="Información de Empleados"
                    className="w-full h-32 object-cover"
                  />
                </div>
                <h3 className="font-bold mb-2 text-blue-800">
                  Información de los empleados
                </h3>
                <p className="text-gray-600 text-sm">
                  Puede crear y editar información de los empleados según se
                  requiera.
                </p>
              </div>
            </div>
          </div>

          {/* Sección de Características de la Plataforma */}
          <div className="container mx-auto px-4 mt-12">
            <h2 className="text-center text-2xl font-bold mb-4 text-blue-800 bg-blue-50 p-4 rounded-lg shadow-md">
              En nuestra plataforma encontrarás:
            </h2>
            <div className="grid grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg">
              {/* Eficiencia */}
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-4 text-blue-800">
                  Eficiencia
                </h3>
                <p className="text-gray-600">
                  Nuestra plataforma está diseñada para maximizar la eficiencia
                  en la gestión de horas extras, ahorrando tiempo y reduciendo
                  costos operativos.
                </p>
              </div>

              {/* Transparencia */}
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-4 text-blue-800">
                  Transparencia
                </h3>
                <p className="text-gray-600">
                  Ofrecemos un sistema claro y transparente que permite a sus
                  empleados y a la gerencia conocer en todo momento el estado de
                  las horas.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <br></br>
    </>
  );
};

export default Dashboard;
