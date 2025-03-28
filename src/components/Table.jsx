import { useState } from "react";

const Table = () => {
  const [bgColor, setBgColor] = useState("white");
  const [textColor, setTextColor] = useState("black"); 

  const handleChange = (event) => {
    const selectedOption = event.target.selectedOptions[0];
    setBgColor(selectedOption.style.backgroundColor); 
    setTextColor(selectedOption.style.color); 
  };

  return (
    <div class="w-full overflow-x-auto">
      <table class="w-full text-sm">
        <thead class= "text-left md:text-base">
          <tr class="grid grid-cols-6 shadow-sm gap-x-1">
            <th class="py-2">Nombre</th>
            <th class="py-2">Código</th>
            <th class="py-2">Fecha</th>
            <th class="py-2 whitespace-nowrap">Horas extras</th>
            <th class="py-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr class="grid grid-cols-6 shadow-lg border-b border-gray-200">
          <td className="px-4 py-2 flex items-center gap-2 shadow-md border-r border-gray-200">
              <img
                alt="Imagen de empleado"
                src="/public/user.png"
                className="w-10 h-10 rounded-full"
              />
              <span>Juan Pérez</span>
            </td>
            <td class="flex justify-center items-center shadow-md border-r border-gray-200">A123</td>
            <td class="flex justify-center items-center shadow-md border-r border-gray-200">2025-03-27</td>
            <td class="flex justify-center items-center shadow-md border-r border-gray-200">Hora diurna: 6:00am - 8:00am</td>
            <td class="flex justify-center items-center shadow-md border-r border-gray-200">
              <select class="rounded-sm px-2 py-1" onChange={handleChange}
                style={{
                  backgroundColor: bgColor,
                  color: textColor,
                }}>
                <option value="Estado" style={{ color: "black", backgroundColor: "white"}}>Estado</option>
                <option value="Aprobado" style={{ color: "green", backgroundColor: "#E6F9EB" }}>
                  Aprobado
                </option>
                <option value="Rechazado" style={{ color: "red", backgroundColor: "#FCE8E6" }}>
                  Rechazado
                </option>
                <option value="Pendiente" style={{ color: "#4A4A4A", backgroundColor: "#F1F1F1" }}>
                  Pendiente
                </option>
              </select>
            </td>
            <td class="flex justify-center items-center">
              <button class=" text-blue-700 px-2 py-1 rounded underline">
                Editar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
