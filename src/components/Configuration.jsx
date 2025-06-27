import { useState, useEffect } from "react";
import { GoGear } from "react-icons/go";
import { FaTimes } from "react-icons/fa";

const Configuration = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [extraHourType, setExtraHourType] = useState([]);
  const [extraHourTypeSelected, setExtraHourTypeSelected] = useState("");
  const [setting, setSetting] = useState({
    limitExtraHoursDay: 0,
    limitExtraHoursWeek: 0,
    totalHoursWeek: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5011/api/extraHourSettings/get-settings", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSetting(data.setting[0]);
        setExtraHourType(data.extraHourType || []);
        setExtraHourTypeSelected(
          data.extraHourTypeSelected[0]?.typeHourName || ""
        );
      });
  }, []);

  const handleTypeChange = (field, value) => {
    setExtraHourType((prev) =>
      prev.map((t) =>
        t.typeHourName === extraHourTypeSelected ? { ...t, [field]: value } : t
      )
    );
  };

  const handleSettingChange = (field, value) => {
    setSetting((prev) => ({ ...prev, [field]: value }));
  };

  const saveConfiguracion = () => {
    fetch("http://localhost:5011/api/extraHourSettings/update-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ExtraHourTypes: extraHourType, Setting: setting }),
    })
      .then(async (res) => {
        const text = await res.text();
        if (res.ok) {
          console.log("Configuración guardada:", text);
          handleCloseCreateModal();
        } else {
          console.error("Error:", text);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        alert("Error de conexión con el servidor");
      });
  };

  const currentType = extraHourType.find(
    (t) => t.typeHourName === extraHourTypeSelected
  );

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <div>
      <div className="absolute top-3 right-20 z-20">
        <button
          className="rounded-full border border-gray-300 shadow-sm p-2 bg-white text-black hover:bg-gray-50"
          onClick={handleOpenCreateModal}
        >
          <GoGear className="h-7 w-7" />
        </button>
      </div>

      {isCreateModalOpen && (
        <div className="w-full overflow-y-auto fixed inset-0 flex items-start justify-center p-4 z-50 animate-fade-in">
          <div className="grid grid-cols-1 gap-x-1 bg-white rounded-lg p-6 shadow-2xl transform transition-all animate-pop-up border border-gray-400 max-w-2xl">
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

            <div className="mb-4">
              <label className="block font-medium mb-1">
                Tipo de hora extra
              </label>
              <select
                className="p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                value={extraHourTypeSelected}
                onChange={(e) => setExtraHourTypeSelected(e.target.value)}
              >
                <option value="">Seleccione un tipo de hora extra</option>
                {extraHourType.map((t) => (
                  <option key={t.typeHourName} value={t.typeHourName}>
                    {t.typeHourName.charAt(0).toUpperCase() +
                      t.typeHourName.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              {currentType && (
                <div className="mb-6 border border-gray-300 p-4 rounded bg-gray-100">
                  <h3 className="font-semibold mb-2">
                    Configuración de Hora Extra{" "}
                    {extraHourTypeSelected.charAt(0).toUpperCase() +
                      extraHourTypeSelected.slice(1)}
                  </h3>

                  <div className="mb-3">
                    <label className="block mb-1">Porcentaje</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                      value={currentType.porcentaje}
                      onChange={(e) =>
                        handleTypeChange("porcentaje", e.target.value)
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block mb-1">Hora de inicio</label>
                    <input
                      type="time"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                      value={currentType.startExtraHour}
                      onChange={(e) =>
                        handleTypeChange("startExtraHour", e.target.value)
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block mb-1">Hora de fin</label>
                    <input
                      type="time"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                      value={currentType.endExtraHour}
                      onChange={(e) =>
                        handleTypeChange("endExtraHour", e.target.value)
                      }
                    />
                  </div>
                </div>
              )}

              <div className="mb-6 border border-gray-300 p-4 rounded bg-gray-100">
                <h3 className="font-semibold mb-2">
                  Configuraciones generales
                </h3>

                <div className="mb-3">
                  <label className="block mb-1">
                    Límite de horas extras al día
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                    value={setting.limitExtraHoursDay}
                    onChange={(e) =>
                      handleSettingChange("limitExtraHoursDay", e.target.value)
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="block mb-1">
                    Límite de horas extras a la semana
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                    value={setting.limitExtraHoursWeek}
                    onChange={(e) =>
                      handleSettingChange("limitExtraHoursWeek", e.target.value)
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="block mb-1">Horas laborales</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                    value={setting.totalHoursWeek}
                    onChange={(e) =>
                      handleSettingChange("totalHoursWeek", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-2 gap-3">
              <button
                type="button"
                onClick={handleCloseCreateModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="bg-blue-200 text-blue-900 px-6 py-2 rounded-md hover:bg-blue-300 transition-colors flex items-center gap-2 whitespace-nowrap justify-center"
                onClick={saveConfiguracion}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Configuration;
