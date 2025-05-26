import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";

const schema = yup.object({
  email: yup.string().required("El correo es requerido."),
  password: yup.string().required("El password es requerido."),
}).required();

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state) => state.auth);
  const [rememberMe, setRememberMe] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-[#101851] font-medium mb-1">
                Correo *
              </label>
              <input
                type="text"
                className={
                  errors.email
                    ? "w-full border-2 border-red-500 rounded-lg p-2"
                    : "w-full border-2 border-[#bcd3fa] rounded-lg p-2"
                }
                {...register("email")}
              />
              <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
            </div>
            <div className="mb-4">
              <label className="block text-[#101851] font-medium mb-1">
                Contraseña *
              </label>
              <input
                type="password"
                className={
                  errors.password
                    ? "w-full border-2 border-red-500 rounded-lg p-2"
                    : "w-full border-2 border-[#bcd3fa] rounded-lg p-2"
                }
                {...register("password")}
              />
              <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
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
              className="w-full bg-[#0177bd] text-white p-3 rounded-lg hover:bg-blue-400 font-bold"
              disabled={loading}
            >
              {loading ? <span className="spinner"></span> : "INICIAR"}
            </button>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;