import { useState, useEffect } from "react";
import { GoGear } from "react-icons/go";
import { FaTimes, FaPlus } from "react-icons/fa";

const Configuration = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [extraHourType, setExtraHourType] = useState([]);
  const [extraHourTypeSelected, setExtraHourTypeSelected] = useState((""));
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
        setExtraHourType(data.extraHourType);
        setExtraHourTypeSelected(data.extraHourTypeSelected[0]);
      });
  }, []);

  const handleTypeChange = (field, value) => {
    setTypes((prev) =>
      prev.map((t) => (t.typeHourName === extraHourTypeSelected ? { ...t, [field]: value } : t))
    );
  };

  const handleSettingChange = (field, value) => {
    setSetting((prev) => ({ ...prev, [field]: value }));
  };

  const saveConfiguracion = () => {
    fetch("http://localhost:5011/api/extraHourSettings/update-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ extraHourType, setting }),
    }).then((res) => {
      if (res.ok) alert("Configuración actualizada correctamente");
      else alert("Error al guardar");
    });
  };

  const currentType = extraHourType.find((t) => t.typeHourName === extraHourTypeSelected);

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

            <div className="mb-4">
              <label className="block font-medium mb-1">
                Tipo de hora extra
              </label>
              <select
                className="w-full p-2 border rounded"
                value={extraHourTypeSelected}
                onChange={(e) => setExtraHourTypeSelected(e.target.value)}
              >
                <option value="">
                  Seleccione un tipo de hora extra
                </option>
                {extraHourType.map((t) => (
                  <option key={t.typeHourName} value={t.typeHourName}>
                    {t.typeHourName.charAt(0).toUpperCase() + t.typeHourName.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {currentType && (
              <div className="mb-6 border p-4 rounded bg-gray-50">
                <h3 className="font-semibold mb-2">
                  Configuración de {extraHourTypeSelected.charAt(0).toUpperCase() + extraHourTypeSelected.slice(1)}
                </h3>

                <div className="mb-3">
                  <label className="block mb-1">Porcentaje</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={currentType.porcentaje}
                    onChange={(e) =>
                      handleTypeChange("porcentaje", e.target.value)
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="block mb-1">Hora de inicio</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={currentType.startExtraHour}
                    onChange={(e) =>
                      handleTypeChange("startExtraHour", e.target.value)
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="block mb-1">Hora de fin</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={currentType.endExtraHour}
                    onChange={(e) =>
                      handleTypeChange("endExtraHour", e.target.value)
                    }
                  />
                </div>
              </div>
            )}

            <div className="mb-6 border p-4 rounded bg-gray-50">
              <h3 className="font-semibold mb-2">Configuración de setting</h3>

              <div className="mb-3">
                <label className="block mb-1">Límite de horas extras al día</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={setting.limitExtraHoursDay}
                  onChange={(e) =>
                    handleSettingChange("limitExtraHoursDay", e.target.value)
                  }
                />
              </div>

              <div className="mb-3">
                <label className="block mb-1">Límite de horas extras a la semana</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
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
                  className="w-full p-2 border rounded"
                  value={setting.totalHoursWeek}
                  onChange={(e) =>
                    handleSettingChange("totalHoursWeek", e.target.value)
                  }
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
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                onClick={saveConfiguracion}
              >
                Guardar configuración
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Configuration;
