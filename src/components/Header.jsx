import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { GoGear } from "react-icons/go";
import { FaTimes, FaPlus } from "react-icons/fa";

const navigation = [
  { name: "Inicio", href: "/dashboard" },
  { name: "Horas extras", href: "/extrahours" },
  { name: "Empleados", href: "/profile" },
  { name: "Historial", href: "/record" },
  { name: "Salir", href: "/login" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [extraHoursConfig, setExtraHoursConfig] = useState([]);
  const [newExtraHoursConfig, setNewExtraHoursConfig] = useState({
    daytimePercentage: "",
    startExtraHourDaytime: "",
    endExtraHourDaytime: "",
    nighttimePercentage: "",
    startExtraHourNighttime: "",
    endExtraHourNighttime: "",
    holidayPercentage: "",
    startExtraHourHoliday: "",
    endExtraHourHoliday: "",
    dailyExtraHoursLimit: "",
    weeklyWorkingHours: "",
  });

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
    setNewExtraHoursConfig({
      daytimePercentage: "",
      startExtraHourDaytime: "",
      endExtraHourDaytime: "",
      nighttimePercentage: "",
      startExtraHourNighttime: "",
      endExtraHourNighttime: "",
      holidayPercentage: "",
      startExtraHourHoliday: "",
      endExtraHourHoliday: "",
      dailyExtraHoursLimit: "",
      weeklyWorkingHours: "",
    });
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateInputChange = (e) => {
    const { name, value } = e.target;
    setNewExtraHoursConfig((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const extraHoursData = {
      daytimePercentage: newExtraHoursConfig.daytimePercentage,
      startExtraHourDaytime: newExtraHoursConfig.startExtraHourDaytime,
      endExtraHourDaytime: newExtraHoursConfig.endExtraHourDaytime,
      nighttimePercentage: newExtraHoursConfig.nighttimePercentage,
      startExtraHourNighttime: newExtraHoursConfig.startExtraHourNighttime,
      endExtraHourNighttime: newExtraHoursConfig.endExtraHourNighttime,
      holidayPercentage: newExtraHoursConfig.holidayPercentage,
      startExtraHourHoliday: newExtraHoursConfig.startExtraHourHoliday,
      endExtraHourHoliday: newExtraHoursConfig.endExtraHourHoliday,
      dailyExtraHoursLimit: newExtraHoursConfig.dailyExtraHoursLimit,
      weeklyWorkingHours: newExtraHoursConfig.weeklyWorkingHours,
    };

    try {
      const response = await fetch(
        "http://localhost:5011/api/users/userCreate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(extraHoursData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear el empleado");
      }

      const updateExtraHoursConfig = await response.json();

      setExtraHoursConfig([...extraHoursConfig, updateExtraHoursConfig]);
      setIsCreateModalOpen(false);

      console.log("Configuración actializada:", updateExtraHoursConfig);
    } catch (error) {
      console.error("Error al actualizar configuración:", error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Disclosure as="nav" className="bg-[url('/banner.jpg')] bg-cover bg-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="shrink-0">
              <img
                alt="Logo Amadeus"
                src="/logoAmadeus.png"
                className="w-55 h-auto"
              />
            </div>
          </div>

          <div className="absolute top-3 right-20 z-20">
            <button
              className="rounded-full border border-gray-300 shadow-sm p-2 bg-white text-black hover:bg-gray-50"
              onClick={handleOpenCreateModal}
            >
              <GoGear className="h-7 w-7" />
            </button>
          </div>

          {/* Configuration */}
          {isCreateModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center p-4 z-50 animate-fade-in">
              <div className="bg-white rounded-lg p-6 shadow-2xl transform transition-all animate-pop-up border border-gray-400 max-w-2xl">
                <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-2">
                  <h2 className="text-2xl font-bold text-blue-900">
                    Actualización de datos de horas extras
                  </h2>
                  <button
                    onClick={handleCloseCreateModal}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                <form onSubmit={handleCreateSubmit}>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Valor(%) hora extra diurna
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        name="daytimePercentage"
                        value={newExtraHoursConfig.daytimePercentage}
                        onChange={handleCreateInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Inicio hora extra diurna
                      </label>
                      <input
                        type="time"
                        name="startExtraHourDaytime"
                        value={newExtraHoursConfig.startExtraHourDaytime}
                        onChange={handleCreateInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fin hora extra diurna
                      </label>
                      <input
                        type="time"
                        name="endExtraHourDaytime"
                        value={newExtraHoursConfig.endExtraHourDaytime}
                        onChange={handleCreateInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Valor(%) hora extra nocturna
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        name="nighttimePercentage"
                        value={newExtraHoursConfig.nighttimePercentage}
                        onChange={handleCreateInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Inicio hora extra nocturna
                      </label>
                      <input
                        type="time"
                        name="startExtraHourNighttime"
                        value={newExtraHoursConfig.startExtraHourNighttime}
                        onChange={handleCreateInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fin hora extra nocturna
                      </label>
                      <input
                        type="time"
                        name="endExtraHourNighttime"
                        value={newExtraHoursConfig.endExtraHourNighttime}
                        onChange={handleCreateInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Valor(%) hora extra dominical y festiva
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        name="holidayPercentage"
                        value={newExtraHoursConfig.holidayPercentage}
                        onChange={handleCreateInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Inicio hora extra dominical y festiva
                      </label>
                      <input
                        type="time"
                        name="startExtraHourHoliday"
                        value={newExtraHoursConfig.startExtraHourHoliday}
                        onChange={handleCreateInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fin hora extra dominical y festiva
                      </label>
                      <input
                        type="time"
                        name="endExtraHourHoliday"
                        value={newExtraHoursConfig.endExtraHourHoliday}
                        onChange={handleCreateInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Límite horas extras al día
                      </label>
                      <input
                        type="number"
                        name="dailyExtraHoursLimit"
                        value={newExtraHoursConfig.dailyExtraHoursLimit}
                        onChange={handleCreateInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Horas laborales a la semana
                      </label>
                      <input
                        type="number"
                        name="weeklyWorkingHours"
                        value={newExtraHoursConfig.weeklyWorkingHours}
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
                      className="bg-blue-200 text-blue-900 px-4 py-2 rounded-md hover:bg-blue-300 transition-colors flex items-center gap-2 whitespace-nowrap"
                    >
                      <FaPlus size={14} />
                      Crear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Mobile menu button */}
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
            <div className="absolute top-16 right-4 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2 z-50">
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
        </div>
      </div>
    </Disclosure>
  );
};

export default Header;
