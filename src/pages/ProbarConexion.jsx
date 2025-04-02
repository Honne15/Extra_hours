import { useEffect, useState } from "react";
import { getMessage } from "../Api";

function ProbarConexion() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        getMessage().then(data => {
            if (data) setMessage(data.message);
        });
    }, []);

    return (
        <div>
            <h1>Prueba de Conexión con .NET</h1>
            <p>{message ? `Mensaje del backend: ${message}` : "Cargando..."}</p>
        </div>
    );
}

export default ProbarConexion;
