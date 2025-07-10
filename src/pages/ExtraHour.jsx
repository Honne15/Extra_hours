import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Table from "../components/Table";

const ExtraHour = () => {
  const [extraHours, setExtraHours] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [searchUserId, setSearchUserId] = useState("");
  const [loading, setLoading] = useState(false);

  // Carga inicial de todas las horas extras
  useEffect(() => {
    fetchAllExtraHours();
  }, [refreshTrigger]);

  const fetchAllExtraHours = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5011/api/hour");
      const data = await response.json();
      setExtraHours(data);
    } catch (error) {
      console.error("Error al obtener todas las horas extras:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExtraHoursByUser = async () => {
    if (!searchUserId.trim()) {
      alert("Por favor ingresa un ID de usuario válido.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5011/api/hour/user/${searchUserId}`);
      if (!response.ok) {
        throw new Error("Error al obtener datos del usuario");
      }
      const data = await response.json();
      setExtraHours(Array.isArray(data) ? data : [data]); // Por si la API devuelve un solo objeto
    } catch (error) {
      console.error("Error al obtener horas del usuario:", error);
      alert("No se encontraron datos para ese ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-center text-3xl font-bold tracking-tight text-[#041148]">
              Gestión de horas extras
            </h1>
          </div>
        </header>

        <main className="flex-grow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

            {/* 🔍 Buscador por ID de usuario */}
            <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
              <input
                type="number"
                placeholder="Buscar por ID de usuario"
                value={searchUserId}
                onChange={(e) => setSearchUserId(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full md:w-64"
              />
              <button
                onClick={fetchExtraHoursByUser}
                className="bg-[#041148] hover:bg-blue-900 text-white px-4 py-2 rounded"
              >
                Buscar
              </button>
              <button
                onClick={fetchAllExtraHours}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Ver todos
              </button>
            </div>

            {/* 🕒 Tabla de resultados */}
            {loading ? (
              <p className="text-center text-gray-600">Cargando...</p>
            ) : (
              <Table
                extraHours={extraHours.filter((h) => h.status === "Pendiente")}
                onStatusChange={setRefreshTrigger}
              />
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ExtraHour;

