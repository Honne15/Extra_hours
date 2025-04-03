import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Table from "../components/Table"
import Footer from "../components/Footer"

const ExtraHour = () => {
  const [extraHours, setExtraHours] = useState([]);

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

    return (
        <>
        <div className="min-h-full">
        <Header></Header>
          <header className="bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-center text-3xl font-bold tracking-tight text-[#041148]">Gestión de horas extras</h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <Table extraHours={extraHours}></Table>
            </div>
            <div class="fixed bottom-0 w-full">
              <Footer></Footer>
            </div>
          </main>
        </div>
      </>
    )
}
 
export default ExtraHour;