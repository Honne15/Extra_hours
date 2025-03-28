import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#bcd3fa] to-white">
      <div className="top-0 left-0 w-1/2 h-full overflow-hidden md:block flex items-center justify-center">
        <div className="relative w-full h-full  transform rotate-45 overflow-hidden">
          <img
            src="./public/images/fondo4.jpg"
            alt="fondo"
            className=" w-full h-full object-cover rotate-315"
          />
          <img
            src="./public/images/logoAmadeus.png"
            alt="logo"
            className="absolute top-40 left-1/8 transform -translate-x-1/3 -translate-y-1/3 rotate-315 object-contain"
          />
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="max-w-md rounded-2xl bg-white p-8 shadow-lg w-96 z-10 relative border-3 border-[#bcd3fa]">
          <h2 className="text-2xl font-bold mb-6 text-[#0177bd] text-center">
            INICIO SESIÓN
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-[#101851] font-medium mb-1">
                Usuario *
              </label>
              <input
                type="text"
                className="w-full border-3 border-[#bcd3fa] rounded-[15px] p-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#101851] font-medium mb-1">
                Contraseña *
              </label>
              <input
                type="password"
                className="w-full border-3 border-[#bcd3fa] rounded-[15px] p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span className="text-gray-700">Recuérdame</span>
            </div>
            <button
              type="submit"
              onClick={handleLogin}
              className="w-64 bg-[#0177bd] text-white p-4 rounded-full hover:bg-blue-400 flex justify-center font-bold ml-auto mr-auto"
            >
              INICIAR
            </button>
            <p className="text-gray-700 text-center mt-4">
              ¿Olvido su contraseña?{" "}
              <a href="#" className="text-[#005eb8]">
                Recuperar
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
