import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import Footer from "../components/Footer";
import Report from "../components/Report";
import { FaSearch } from "react-icons/fa";

const Record = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [extraHours, setExtraHours] = useState([]);

  useEffect(() => {
    const fetchExtraHours = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/hours`);
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

        <div className="sm:px-6 lg:px-8 mt-3 flex justify-end">
          <Report />
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
