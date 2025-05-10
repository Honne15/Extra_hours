import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="flex h-screen">
      <div className="absolute top-0 left-0 w-[60%] h-full overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/Imagen.jpg')",
            clipPath: "polygon(0% 0%, 100% 0%, 70% 100%, 0% 100%)",
          }}
        ></div>
        <img
          src="/public/images/logoAmadeus.png"
          alt="logo"
          className="absolute top-6 left-6 w-40 z-20"
        />
      </div>

      <div className="w-full md:w-[40%] flex items-center justify-center ml-auto">
        <div className="max-w-md rounded-2xl bg-white p-8 shadow-lg w-96 z-10 relative border-3 border-[#bcd3fa] mr-10">
          <h2 className="text-2xl font-bold mb-6 text-[#0177bd] text-center">
            INICIO DE SESIÓN
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-[#101851] font-medium mb-1">
                Usuario
              </label>
              <input
                type="text"
                className="w-full border-2 border-[#bcd3fa] rounded-lg p-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#101851] font-medium mb-1">
                Contraseña
              </label>
              <input
                type="password"
                className="w-full border-2 border-[#bcd3fa] rounded-lg p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#0177bd] text-white p-3 rounded-lg hover:bg-blue-400 font-bold"
            >
              INICIAR
            </button>
            <p className="text-gray-700 text-center mt-4">
              <a href="#" className="text-[#005eb8] underline">
                Recuperar contraseña
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
