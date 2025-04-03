const TableEmployee = ({ employees }) => {

  return (
    <div class="w-full overflow-x-auto">
      <table class="w-full text-sm">
        <thead class= "text-left md:text-base">
          <tr class="grid grid-cols-4 shadow-sm gap-x-1">
            <th class="py-2">Nombre</th>
            <th class="py-2">Telefono</th>
            <th class="py-2">Email</th>
            <th class="py-2">Código</th>
          </tr>
        </thead>
        <tbody>
            {employees && employees.map((employee) => (
              <tr key={employee.id} class="grid grid-cols-4 shadow-sm gap-x-1">
                <td class="px-4 py-2 flex items-center gap-2 shadow-md border-r border-gray-200">
                  <span>{employee.name}</span>
                </td>
                <td class="flex justify-center items-center shadow-md border-r border-gray-200">{employee.phoneNumber}</td>
                <td class="flex justify-center items-center shadow-md border-r border-gray-200">{employee.email}</td>
                <td class="flex justify-center items-center shadow-md border-r border-gray-200">{employee.code}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableEmployee;
