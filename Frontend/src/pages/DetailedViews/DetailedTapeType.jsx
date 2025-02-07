import { useState } from "react";
//import { useEffect } from "react";
import { updateTapesTypes, getTapesTypes } from "../../api";
import Header from "../../components/Header";
import NavBarLogin from "../../components/NavBarLogin";
import "../../styles/forms.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function DetailedTapeType() {
  const { id } = useParams();

  const [data, setData] = useState({
    tapeTypeCode: "",
    name: "",
    size: "",
    description: "",
    
  });

  useEffect(() => {
    async function loadElement() {
      if (id) {
        const response = await getTapesTypes(id);
        console.log(response);
        const { data } = response;
        // const formattedDate = data.used_at ? new Date(data.used_at).toISOString().split("T")[0] : "";
        //setName(data.tapeType_name);
        setData({
          tapeTypeCode: data.tapeTypeCode,
          name: data.name,
          size: data.size,

          //elementtapeTypeCode: data.elementtapeTypeCode,
          description: data.description,
          
        });
      }
    }
    loadElement();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data)
    if (id) {
      await updateTapesTypes(id, data);
      toast.success("Datos actualizados", {
        duration: 16000,
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
      <div className="bg-[#f1f1f1] w-[100vw] h-screen flex items-center justify-center">
        <div className="bg-white h-full w-full flex flex-col items-center justify-center  relative overflow-y-auto">
          <form className="w-full h-full" onSubmit={handleSubmit}>
            <div className="mb-1 w-full h-20  bg-[#151980] flex items-center">
              <h1 className="w-full text-white font-semibold text-xl text-left my-auto ml-7">
                EDITAR TIPO DE CINTA
              </h1>
            </div>
            <div className="flex flex-col flex-1 w-full items-center justify-center">
              <div className="relative w-[90%] mt-10 mx-auto">
                <input
                  type="text"
                  required
                  name="tapeTypeCode"
                  onChange={handleChange}
                  value={data.tapeTypeCode}
                  className={`block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40`}
                  id="nombre"
                />

                <label
                  htmlFor="nombre"
                  className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl"
                >
                  TIPO DE CINTA
                </label>
              </div>
              <div className="relative w-[90%] mt-10 mx-auto">
                <input
                  type="text"
                  required
                  name="name"
                  onChange={handleChange}
                  value={data.name}
                  className={`block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40`}
                  id="nombre"
                />
                <label
                  htmlFor="nombre"
                  className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl"
                >
                  DESCRIPCIÓN TIPO DE CINTA
                </label>
              </div>
              <div className="relative w-[90%] mt-10 mx-auto">
                <input
                  type="number"
                  name="size"
                  value={data.size}
                  required
                  onChange={handleChange}
                  className={`block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40`}
                  id="capacidad"
                />
                <label
                  htmlFor="capacidad"
                  className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl"
                >
                  CAPACIDAD
                </label>
              </div>
              {/* <div className="relative w-[90%] mt-10 mx-auto">
                <input
                  type="date"
                  name="used_at"
                  value={data.used_at}
                  required
                  onChange={handleChange}
                  className={`block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40`}
                  id="Fecha"
                />
                <label
                  htmlFor="Fecha"
                  className="flex flex-row absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase"
                >
                  Fecha de creación: <p className="ml-3 text-blue-800">{data.used_at}</p>
                </label>
              </div> */}
            </div>

            <div className="relative  w-[90%] flex flex-col  mx-auto mt-10 ">
              <label
                htmlFor="Observaciones"
                className="absolute top-0 left-0  px-2 py-1 mb-3  text-black  -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out  font-semibold text-xl"
              >
                OBSERVACIONES
              </label>
              <textarea
                name="description"
                id="Observaciones"
                className="block p-6 mt-5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                required
                onChange={handleChange}
                value={data.description}
              ></textarea>
            </div>
            <div className="w-full flex justify-center">
              <button
                type="submit"
                value="Enviar Datos"
                className="p-4 bg-blue-700 rounded-xl text-white mt-32 mb-5 cursor-pointer"
              >
                ACTUALIZAR DATOS
              </button>
              <Toaster></Toaster>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
