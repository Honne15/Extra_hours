import { useEffect, useState } from "react";

const Table = ({ extraHours, onStatusChange }) => {
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    const initialMap = {};
    extraHours?.forEach((item) => {
      initialMap[item.id] = item.status || "Pendiente";
    });
    setStatusMap(initialMap);
  }, [extraHours]);

  const handleChange = async (event, id) => {
    const selectedValue = event.target.value;

    // Actualiza el estado local
    setStatusMap((prev) => ({
      ...prev,
      [id]: selectedValue,
    }));

    try {
      const response = await fetch(`http://localhost:5011/api/hour/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: selectedValue }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar estado");
      }
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      alert("Hubo un problema al guardar el estado.");
    }
  };

  const getStyles = (status) => {
    switch (status) {
      case "Aprobado":
        return { backgroundColor: "#E6F9EB", color: "green" };
      case "Rechazado":
        return { backgroundColor: "#FCE8E6", color: "red" };
      default:
        return { backgroundColor: "#F1F1F1", color: "#4A4A4A" };
    }
  };

  return (
    <div class="w-full overflow-x-auto">
      <div class="hidden md:block">
        <table class="w-full text-sm">
          <thead class="text-left md:text-base font-sans text-gray-800 text-lg tracking-wide leading-relaxed">
            <tr class="grid grid-cols-5 shadow-sm gap-x-1">
              <th class="py-2">Nombre</th>
              <th class="py-2">Código</th>
              <th class="py-2">Fecha</th>
              <th class="py-2 whitespace-nowrap">Horas extras</th>
              <th class="py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {extraHours &&
              extraHours.map((extraHour) => (
                <tr
                  key={extraHour.id}
                  class="grid grid-cols-5 shadow-sm gap-x-1"
                >
                  <td class="px-4 py-2 flex items-center gap-2 shadow-md border-r border-gray-200">
                    <span>{extraHour.name}</span>
                  </td>
                  <td class="flex justify-center items-center shadow-md border-r border-gray-200">
                    {extraHour.code}
                  </td>
                  <td class="flex justify-center items-center shadow-md border-r border-gray-200">
                    {extraHour.date}
                  </td>
                  <td class="flex justify-center items-center shadow-md border-r border-gray-200">
                    {extraHour.startTime} a {extraHour.endTime}
                  </td>
                  <td class="flex justify-center items-center shadow-md border-r border-gray-200">
                    <select
                      class="rounded-sm px-2 py-1"
                      value={statusMap[extraHour.id] || "Pendiente"}
                      onChange={(e) => handleChange(e, extraHour.id)}
                      style={getStyles(statusMap[extraHour.id])}
                    >
                      <option value="Pendiente" style={getStyles("Pendiente")}>
                        Pendiente
                      </option>
                      <option value="Aprobado" style={getStyles("Aprobado")}>
                        Aprobado
                      </option>
                      <option value="Rechazado" style={getStyles("Rechazado")}>
                        Rechazado
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Vista tipo tarjeta (solo visible en pantallas pequeñas) */}

      <div className="flex md:hidden flex-wrap justify-center items-start gap-4">
        {extraHours &&
          extraHours.map((extraHour) => (
            <div
              key={extraHour.id}
              className="bg-white rounded-lg shadow-md p-5 border border-gray-200 
                 w-[280px] h-[200px] flex flex-col justify-between
                 text-left md:text-base font-sans text-gray-800 text-[13px] tracking-wide leading-relaxed"
            >
              <p className="mb-2 truncate">
                <span className="font-bold">Nombre:</span> {extraHour.name}
              </p>
              <p className="mb-2 truncate">
                <span className="font-bold">Código:</span> {extraHour.code}
              </p>
              <p className="mb-2 truncate">
                <span className="font-bold">Fecha:</span> {extraHour.date}
              </p>
              <p className="truncate">
                <span className="font-bold">Horas extras:</span>{" "}
                {extraHour.startTime} a {extraHour.endTime}
              </p>
              <p className="truncate">
                <span className="font-bold">Estado:</span>
                <select
                      class="rounded-sm px-2 py-1"
                      value={statusMap[extraHour.id] || "Pendiente"}
                      onChange={(e) => handleChange(e, extraHour.id)}
                      style={getStyles(statusMap[extraHour.id])}
                    >
                      <option value="Pendiente" style={getStyles("Pendiente")}>
                        Pendiente
                      </option>
                      <option value="Aprobado" style={getStyles("Aprobado")}>
                        Aprobado
                      </option>
                      <option value="Rechazado" style={getStyles("Rechazado")}>
                        Rechazado
                      </option>
                </select>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Table;
