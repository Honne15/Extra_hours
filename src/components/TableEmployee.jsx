import { MdDeleteOutline } from "react-icons/md";

const TableEmployee = ({ employees, filteredEmployees, onDeleteEmployee }) => {

  const employeeList = filteredEmployees?.length > 0 ? filteredEmployees : employees;

  const handleDeleteEmployee = (id) => {
    if (onDeleteEmployee) {
      onDeleteEmployee(id);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2">
      <div className="hidden md:block">
        <table className="w-full text-sm">
          <thead className="text-left md:text-base font-sans text-gray-800 text-lg tracking-wide leading-relaxed">
            <tr className="grid grid-cols-[2fr_2fr_3fr_2fr_1fr] shadow-sm gap-x-1">
              <th className="py-2 px-1">Nombre</th>
              <th className="py-2 px-1">Teléfono</th>
              <th className="py-2 px-1">Email</th>
              <th className="py-2 px-1">Código</th>
              <th className="py-2 px-1"></th>
            </tr>
          </thead>
          <tbody> 
            {employeeList?.map((employee) => (
              <tr key={employee.id} className="grid grid-cols-[2fr_2fr_3fr_2fr_1fr] shadow-sm gap-x-1 text-left  font-sans text-gray-800 text-[13px] tracking-wide leading-relaxed">
                <td className="px-4 py-2 flex items-center gap-2 shadow-md border-r border-gray-200">
                  {employee.name}
                </td>
                <td className="flex justify-center items-center shadow-md border-r border-gray-200">
                  {employee.phoneNumber}
                </td>
                <td className="flex justify-center items-center shadow-md border-r border-gray-200">
                  {employee.email}
                </td>
                <td className="flex justify-center items-center shadow-md border-r border-gray-200">
                  {employee.code}
                </td>
                <td className="flex justify-center items-center shadow-md border-r border-gray-200">
                  <button onClick={() => handleDeleteEmployee(employee.id)} className="bg-blue-200 text-blue-900 px-2 py-2 rounded hover:bg-blue-300 transition-colors">
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista tipo tarjeta (solo visible en pantallas pequeñas) */}
<div className="flex md:hidden flex-wrap justify-center items-start gap-4">
  {employeeList?.map((employee) => (
    <div
      key={employee.id}
      className="bg-white rounded-lg shadow-md p-5 border border-gray-200 
                 w-[280px] h-[200px] flex flex-col justify-between
                 text-left md:text-base font-sans text-gray-800 text-[13px] tracking-wide leading-relaxed"
    >
      <p className="mb-2 truncate">
        <span className="font-bold">Nombre:</span> {employee.name}
      </p>
      <p className="mb-2 truncate">
        <span className="font-bold">Teléfono:</span> {employee.phoneNumber}
      </p>
      <p className="mb-2 truncate">
        <span className="font-bold">Email:</span> {employee.email}
      </p>
      <p className="truncate">
        <span className="font-bold">Código:</span> {employee.code}
      </p>
      <p>
        <button onClick={() => handleDeleteEmployee(employee.id)} className="bg-blue-200 text-blue-900 px-2 py-2 rounded hover:bg-blue-300 transition-colors">
          <MdDeleteOutline />
        </button>
      </p>
    </div>
  ))}
      </div>
    </div>
  );
};

export default TableEmployee;
