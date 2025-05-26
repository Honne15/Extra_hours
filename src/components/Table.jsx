import { useState } from "react";

const Table = ({ extraHours }) => {
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
          <tr class="grid grid-cols-5 shadow-sm gap-x-1">
            <th class="py-2">Nombre</th>
            <th class="py-2">Código</th>
            <th class="py-2">Fecha</th>
            <th class="py-2 whitespace-nowrap">Horas extras</th>
            <th class="py-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {extraHours && extraHours.map((extraHour) => (
            <tr key={extraHour.id} class="grid grid-cols-5 shadow-sm gap-x-1">
              <td class="px-4 py-2 flex items-center gap-2 shadow-md border-r border-gray-200">
                <span>{extraHour.name}</span>
              </td>
              <td class="flex justify-center items-center shadow-md border-r border-gray-200">{extraHour.code}</td>
              <td class="flex justify-center items-center shadow-md border-r border-gray-200">{extraHour.date}</td>
              <td class="flex justify-center items-center shadow-md border-r border-gray-200">{extraHour.startTime}-{extraHour.endTime}</td>
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
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
