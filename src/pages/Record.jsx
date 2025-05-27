import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import Footer from "../components/Footer";
import { FaSearch } from "react-icons/fa";

const Record = () => {
  const [extraHours, setExtraHours] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchExtraHours = async () => {
      try {
        const response = await fetch("http://localhost:5011/api/hour");
        const data = await response.json();
        setExtraHours(data);
      } catch (error) {
        console.error("Error al obtener empleados:", error);
      }
    };
    fetchExtraHours();
  }, []);

  const filteredHours = extraHours.filter(
    (h) => h.status === "Aprobado" || h.status === "Rechazado"
  );

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedQuery = searchQuery.trim();

      if (trimmedQuery === "") return;

      try {
        const response = await fetch(
          `http://localhost:5011/api/users/search/${trimmedQuery}`
        );

        if (!response.ok) throw new Error("Error al buscar el empleado");

        const foundEmployee = await response.json();

        if (foundEmployee) {
          // Aquí podrías filtrar las horas extra del empleado encontrado
          const filtered = extraHours.filter(
            (hour) =>
              hour.code === foundEmployee.code
          );
          setExtraHours(filtered);
        } else {
          console.warn("Empleado no encontrado");
        }
      } catch (error) {
        console.error("Error en la búsqueda:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-center text-3xl font-bold tracking-tight text-[#041148]">
            Historial de Horas Extras
          </h1>
        </div>
      </header>
      <main className="flex-grow">
        {/* Barra de búsqueda */}
        <div className="flex justify-center mt-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Buscar empleado por nombre..."
              className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Table extraHours={filteredHours}  />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Record;
