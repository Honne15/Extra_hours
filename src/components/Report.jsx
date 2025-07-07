import { FaPlus } from "react-icons/fa";

const Report = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleClick = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api/report/download`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Error al generar el reporte");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "Reporte_HorasExtras.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className="w-[180px] bg-blue-200 text-blue-900 px-6 py-2 rounded-md hover:bg-blue-300 transition-colors flex items-center gap-2 whitespace-nowrap justify-center"
      onClick={handleClick}
      type="button"
    >
      <FaPlus size={14} />
      Generar Reporte
    </button>
  );
};

export default Report;
