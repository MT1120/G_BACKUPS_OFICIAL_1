import { useState } from "react";
//import { useEffect } from "react";
//import api from "../../api";
import Header from "../../components/Header";
import NavBarLogin from "../../components/NavBarLogin";
import "../../styles/forms.css";
import { useEffect } from "react";
import { updateFrecuencies, getFrecuencies } from "../../api";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function DetailedFrecuency() {
  const { id } = useParams();
  

  const [data, setData] = useState({
    valueCode:"",
    value: "",
  });

  useEffect(() => {
    async function loadFrecuency() {
      if (id) {
        const response = await getFrecuencies(id);
        console.log(response);
        const { data } = response;
        //setName(data.tapeType_name);
        setData({
          valueCode:data.valueCode,
          value: data.value,
        });
      }
    }
    loadFrecuency();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateFrecuencies(id, data);
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
        <div className="bg-white h-[80%] w-[80%] flex flex-col items-center justify-center rounded-xl border-2 border-gray-200 shadow-2xl relative overflow-y-auto">
          <form className="w-full h-full" onSubmit={handleSubmit}>
            <div className="mb-1 w-full h-20 rounded-t-xl bg-[#151980] flex items-center  ">
              <h1 className="w-full text-white font-semibold text-xl text-left my-auto ml-7">
                EDITAR FRECUENCIA
              </h1>
            </div>
            <div className="flex flex-row flex-1 w-full items-center justify-center">
              <div className="relative w-[90%] mt-10 mx-auto">
                <input
                  type="text"
                  name="valueCode"
                  id="frecuencia"
                  required
                  onChange={handleChange}
                  value={data.valueCode}
                  className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <label
                  htmlFor="frecuencia"
                  className="absolute top-0 left-0 px-2 py-1 mb-3 text-gray-600  -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out  font-semibold text-xl"
                >
                  CODIGO DE LA FRECUENCIA
                </label>
              </div>
            </div>
            <div className="flex flex-row flex-1 w-full items-center justify-center">
              <div className="relative w-[90%] mt-10 mx-auto">
                <input
                  type="text"
                  name="value"
                  id="frecuencia"
                  required
                  onChange={handleChange}
                  value={data.value}
                  className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <label
                  htmlFor="frecuencia"
                  className="absolute top-0 left-0 px-2 py-1 mb-3 text-gray-600  -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out  font-semibold text-xl"
                >
                  FRECUENCIA ( Dato actual:
                  <span className="text-blue-800"> {data.value}</span>)
                </label>
              </div>
            </div>

            <div className="w-full flex justify-center bottom-3 absolute">
              <button
                type="submit"
                value="Enviar Datos"
                className="p-4 bg-blue-700 rounded-xl text-white  mt-10 cursor-pointer"
              >ACTUALIZAR DATOS</button>
              <Toaster></Toaster>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
