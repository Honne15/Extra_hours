const Table = () => {
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
              <select class="border rounded-sm">
                <option value="Aprobado" class="">Estado</option>
                <option value="Aprobado" class="text-green-700 bg-green-200">Aprobado</option>
                <option value="Rechazado" class="text-red-700 bg-red-200">Rechazado</option>
                <option value="Pendiente" class="text-gray-700 bg-gray-200">Pendiente</option>
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
