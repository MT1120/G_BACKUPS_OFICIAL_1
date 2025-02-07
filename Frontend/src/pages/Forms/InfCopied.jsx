//InfCopied

import { useState, useEffect } from "react";
import api from "../../api";
import Header from "../../components/Header";
import NavBarLogin from "../../components/NavBarLogin";
import "../../styles/forms.css";
import { useNavigate } from "react-router-dom";

export default function InfCopied() {
  const [description, setDescription] = useState("");
  const [element, setElement] = useState("");
  const [copiedInf, setCopiedInf] = useState("");

  const [elementTypes, setElementType] = useState([]);

  const getElements = () => {
    api
      .get("/api/element/")
      .then((res) => res.data)
      .then((data) => {
        setElementType(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const createInfC = (e) => {
    e.preventDefault();
    api
      .post("/api/copiedInf/", { element, copiedInf, description })
      .then((res) => {
        if (res.status === 201) {
          alert("Creado con éxito");
        } else {
          alert("Error al crear la información copiada");
        }
      })
      .catch((err) => alert(err));

    setElement("");
    setCopiedInf("");
    setDescription("");
  };
  useEffect(() => {
    getElements();
  }, []);

  const navigate = useNavigate();
  const handleNavigation = (link) => {
    navigate(link);
  };

  return (
    <div className="w-[100vw] h-screen overflow-x-hidden">
      <Header />
      <NavBarLogin />
      <div className="bg-[#f1f1f1] w-[100vw] h-full flex items-center justify-center ">
        <div className="bg-white h-full w-full flex flex-col items-center justify-center overflow-y-auto relative">
          <form className="w-full h-full" onSubmit={createInfC}>
            <div className="mb-1 w-full h-20  bg-[#151980] flex flex-1 flex-row items-center  ">
              <h1 className="w-full text-white font-semibold text-xl text-left my-auto uppercase  ml-7 ">
                Información copiada
              </h1>
              {elementTypes.length > 0 ? (
                <div className="text-white font-semibold  text-right my-auto uppercase mr-7">
                  <h2>Hay elementos disponibles</h2>
                </div>
              ) : (
                <div
                  className="bg-white text-[#151980] font-semibold  text-center my-auto uppercase rounded-xl p-2 mr-5 cursor-pointer"
                  onClick={() => handleNavigation(`/element`)}
                >
                  Crear un elemento
                </div>
              )}
            </div>
            <div className="flex flex-col flex-1 w-full items-center justify-center">
              <div className="relative w-[90%] mt-10 mx-auto">
                <select
                  name="select1"
                  value={element}
                  onChange={(e) => setElement(e.target.value)}
                  className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                >
                  <option value="" disabled></option>
                  {elementTypes.map((elementType) => (
                    <option value={elementType.id} key={elementType.id}>
                      {elementType.elementType}
                    </option>
                  ))}
                </select>
                <label className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase ">
                  Elige el elemento deseado
                </label>
              </div>
              <div className="relative w-[90%] mt-10 mx-auto">
                <input
                  type="text"
                  name="infc"
                  id="infc"
                  required
                  onChange={(e) => setCopiedInf(e.target.value)}
                  value={copiedInf}
                  className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <label
                  htmlFor="infc"
                  className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase "
                >
                  Información copiada
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
                name="Observaciones"
                id="Observaciones"
                className="block p-6 mt-5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>

            <div className="w-full flex justify-center  mt-20">
              <input
                type="submit"
                value="Enviar Datos"
                className="p-4 bg-blue-700 rounded-xl text-white    cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
