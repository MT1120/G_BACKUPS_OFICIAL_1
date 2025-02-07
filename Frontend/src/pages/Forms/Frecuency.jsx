import { useState } from "react";
//import { useEffect } from "react";
import api from "../../api";
import Header from "../../components/Header";
import NavBarLogin from "../../components/NavBarLogin";
import "../../styles/forms.css";
//import { useEffect } from "react";
//import { getFrecuencies, deleteFrecuencies } from "../../api";
//import { FaTrash } from "react-icons/fa";
//import toast, { Toaster } from "react-hot-toast";

export default function Frecuency() {
  const [value, setValue] = useState("");
  const [valueCode, setCodeFrecuency] = useState("");

  

  const createFrecuency = (e) => {
    e.preventDefault();
    api
      .post("/api/frecuency/", {valueCode, value })
      .then((res) => {
        if (res.status === 201) {
          alert("Frecuencia creada");
        } else {
          alert("Error al crear la frecuencia");
        }
      })
      .catch((err) => alert(err));

    setValue("");
    setCodeFrecuency("");
  };

  // const [frecuencies, setFrecuencies] = useState([]);

  // const getFrecy = () => {
  //   getAllFrecuencies()
  //     .then((res) => res.data)
  //     .then((data) => {
  //       setFrecuencies(data);
  //       console.log(data);
  //     })
  //     .catch((err) => alert(err));
  // };

  // useEffect(() => {
  //   getFrecy();
  // }, []);

  return (
    <div className="w-[100vw] h-screen overflow-x-hidden">
      <Header />
      <NavBarLogin />
      <div className="bg-[#f1f1f1] w-[100vw] h-screen flex items-center justify-center">
        <div className="bg-white h-[80%] w-[78%] flex flex-col items-center justify-center rounded-xl border-2 border-gray-200 shadow-2xl relative overflow-y-auto">
          <form className="w-full h-full relative" onSubmit={createFrecuency}>
            <div className="mb-1 w-full h-20 rounded-t-xl bg-[#151980] flex items-center  ">
              <h1 className="w-full text-white font-semibold text-xl text-left my-auto ml-7 ">
                FORMULARIO DE FRECUENCIAS
              </h1>
            </div>
            <div className="flex flex-row flex-1 w-full items-center justify-center">
              <div className="relative w-[90%] mt-10 mx-auto">
                <input
                  type="text"
                  name="frecuencia"
                  id="frecuencia"
                  required
                  onChange={(e) => setCodeFrecuency(e.target.value)}
                  value={valueCode}
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
                  name="frecuencia"
                  id="frecuencia"
                  required
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                  className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <label
                  htmlFor="frecuencia"
                  className="absolute top-0 left-0 px-2 py-1 mb-3 text-gray-600  -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out  font-semibold text-xl"
                >
                  FRECUENCIA
                </label>
              </div>
            </div>

            <div className="w-full flex justify-center bottom-3 absolute">
              <input
                type="submit"
                value="Enviar Datos"
                className="p-4 bg-blue-700 rounded-xl text-white  mt-10 cursor-pointer"
              />
            </div>
          </form>

          
        </div>
      </div>
    </div>
  );
}
