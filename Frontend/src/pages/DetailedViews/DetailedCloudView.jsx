import { useState, useEffect } from "react";
// import api from "../../api";
import "../../styles/forms.css";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { updateClouds, getClouds } from "../../api";
import Header from "../../components/Header";
import NavBarLogin from "../../components/NavBarLogin";

export default function DetailedCloudView() {
  const { id } = useParams();

  const [data, setData] = useState({
    cloud_name: "",
    description: "",
    used_at: "",
  });

  useEffect(() => {
    async function loadCloud() {
      if (id) {
        const response = await getClouds(id);
        console.log(response);
        const { data } = response;

        const formattedDate = data.used_at
          ? new Date(data.used_at).toISOString().split("T")[0]
          : "";
        setData({
          cloud_name: data.cloud_name,
          description: data.description,
          used_at: formattedDate,
        });
      }
    }
    loadCloud();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateClouds(id, data);
      toast.success("Datos actualizados", {
        duration: 15000,
        position: "top-center",
        style: {
          background: "#151980",
          color: "#fff",
        },
      });
    }
    //navigate("/backup/");
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-[100vw] h-screen overflow-x-hidden">
      <Header />
      <NavBarLogin />
      <div className="bg-[#f1f1f1] w-[100vw] h-full flex items-center justify-center">
        <div className="bg-white h-full w-full flex flex-col items-center justify-center relative overflow-y-auto">
          <form className="w-full h-full" onSubmit={handleSubmit}>
            <div className="mb-1 w-full h-20  bg-[#151980] flex items-center  ">
              <h1 className="w-full text-white font-semibold text-xl text-left my-auto uppercase ml-7">
                Actualizar Servicio que soporta
              </h1>
            </div>
            <div className="relative w-[90%] mt-11 mx-auto">
              <input
                type="text"
                name="cloud_name"
                id="cloud_name"
                required
                value={data.cloud_name}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-5 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <label
                htmlFor="cloud_name"
                className="absolute -top-1 left-0 px-2 py-1 mb-4 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase "
              >
                Nombre de la nube
              </label>
            </div>
            <div className="flex flex-col flex-1 w-full items-center justify-center ">
              <div className="relative w-[90%] mt-11 mx-auto">
                <input
                  name="used_at"
                  type="date"
                  id="used_at"
                  value={data.used_at}
                  required
                  onChange={handleChange}
                  className={`block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40`}
                />
                <label
                  htmlFor="used_at"
                  className="absolute -top-3 left-0 px-2 py-1 mb-7 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase"
                >
                  Fecha de creación
                </label>
              </div>
            </div>

            <div className="relative  w-[90%] flex flex-col  mx-auto mt-10 ">
              <label
                htmlFor="Observaciones"
                className="absolute top-0 left-0  px-2 py-1 mb-3  text-black  -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out  font-semibold text-xl uppercase"
              >
                Observaciones
              </label>
              <textarea
                name="description"
                id="description"
                className="block p-6 mt-5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                required
                onChange={handleChange}
                value={data.description}
              ></textarea>
            </div>

            <div className="w-full flex justify-center">
              <button
                type="submit"
                value="Enviar Datos"
                className="p-4 bg-blue-700 rounded-xl text-white  absolute bottom-3 cursor-pointer uppercase"
              >
                Actualizar datos
              </button>
              <Toaster></Toaster>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
