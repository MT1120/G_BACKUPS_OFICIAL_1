import { useState } from "react";
//import { useEffect } from "react";
import api from "../../api";
import Header from "../../components/Header";
import NavBarLogin from "../../components/NavBarLogin";
import "../../styles/forms.css";


export default function TapeType() {
  const [name, setName] = useState("");
  const [tapeTypeCode, settapeTypeCode] = useState("");
  const [size, setSize] = useState("");
  const [description, setObservaciones] = useState("");
  // const [used_at, setUsed_at] = useState(new Date());

  const createTapeType = (e) => {
    e.preventDefault();
    api
      .post("/api/tapetypes/", {
        tapeTypeCode,
        name,
        size,
        description,
       
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Tipo de cinta creada");
        } else {
          alert("Error de creación");
        }
      })
      .catch((err) => alert(err));

    setName("");
    setObservaciones("");
    settapeTypeCode("");
    setSize("");
    // setUsed_at(new Date());
  };

  return (
    <div className="w-[100vw] h-screen overflow-x-hidden">
      <Header />
      <NavBarLogin />
      <div className="bg-[#f1f1f1] w-[100vw] h-screen flex items-center justify-center">
        <div className="bg-white h-full w-full flex flex-col items-center justify-center  relative overflow-y-auto">
          <form className="w-full h-full" onSubmit={createTapeType}>
            <div className="mb-1 w-full h-20  bg-blue-800 flex items-center ">
              <h1 className="w-full text-white font-bold text-xl text-left my-auto ml-7">
                INGRESO DE TIPO DE CINTA
              </h1>
            </div>
            <div className="flex flex-col flex-1 w-full items-center justify-center">
              <div className="relative w-[90%] mt-10 mx-auto">
                <input
                  type="text"
                  required
                  onChange={(e) => settapeTypeCode(e.target.value)}
                  value={tapeTypeCode}
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
                  onChange={(e) => setName(e.target.value)}
                  value={name}
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
                  value={size}
                  required
                  onChange={(e) => setSize(e.target.value)}
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
            </div>

            {/* <div className="relative w-[90%] mt-11 mx-auto">
              <input
                type="date"
                id="used_at"
                value={used_at}
                required
                onChange={(e) => setUsed_at(e.target.value)}
                className={`block w-full px-4 py-2 mt-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40`}
              />
              <label
                htmlFor="used_at"
                className="absolute -top-3 left-0 px-2 py-1 mb-7 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase"
              >
                Fecha de creación
              </label>
            </div> */}

            <div className="relative  w-[90%] flex flex-col  mx-auto mt-10 ">
              <label
                htmlFor="Observaciones"
                className="absolute top-0 left-0  px-2 py-1 mb-3  text-black  -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out  font-semibold text-xl"
              >
                OBSERVACIONES
              </label>
              <textarea
                name="Observaciones"
                id="Observaciones"
                className="block p-6 mt-5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                required
                onChange={(e) => setObservaciones(e.target.value)}
                value={description}
              ></textarea>
            </div>
            <div className="w-full flex justify-center">
              <input
                type="submit"
                value="Enviar Datos"
                className="p-4 bg-[#151980] rounded-xl text-white mt-28 mb-5 cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
