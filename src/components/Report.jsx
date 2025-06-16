import { FaPlus } from "react-icons/fa";

const Report = () => {
  return (
    <button
      className="w-[180px] bg-blue-200 text-blue-900 px-6 py-2 rounded-md hover:bg-blue-300 transition-colors flex items-center gap-2 whitespace-nowrap justify-center"
    >
      <FaPlus size={14} />
      Generar Reporte
    </button>
  );
};

export default Report;
